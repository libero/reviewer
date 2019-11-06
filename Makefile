help:
	@echo "Libero reviewer CI Makefile"
	@echo "---"
	@echo "The purpose of this file is to help clean up the ci-config"
	@echo "and to make it easier to switch CI providers if necessary"
	@echo ""
	@echo "To run the CI script locally, use 'make local_ci', which will"
	@echo "start building all components in parallel"
	@echo ""
	@echo "If you aren't familliar with Makefile, there are a couple of"
	@echo "things you should know:"
	@echo "- each command runs in it's own shell, hence all the 'cd's"
	@echo "- the build targets are in the format <name>:[<dependencies>]"

# COMMIT_SLUG = `git log HEAD^..HEAD --pretty=oneline --abbrev-commit | head -c 7`
.DEFAULT_GOAL=help

DOCKER_NETWORK_NAME=reviewer_build

IMAGE_TAG ?= "local"

PUSH_COMMAND = IMAGE_TAG=${IMAGE_TAG} .scripts/travis/push-image.sh

DC_BUILD = IMAGE_TAG=${IMAGE_TAG} docker-compose -f docker-compose.build.yml

###########################
#
# Local Dev Environment
#
###########################

start_networks:
	-docker network create infra_postgres
	-docker network create infra_api
	-docker network create infra_rabbit

start_infra: start_networks
	# don't forget this just starts the containers, it doesn't assert that a particular
	# thing is running
	docker-compose -f docker-compose.infra.yml up -d

start_services: start_infra
	docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
	docker-compose -f docker-compose.yml logs -f

stop_services:
	docker-compose -f docker-compose.yml -f docker-compose.override.yml down
	docker-compose -f docker-compose.infra.yml down
	docker network rm infra_postgres
	docker network rm infra_api
	docker network rm infra_rabbit

###########################
#
# Docker Setup
#
###########################

start_network:
	-docker network create ${DOCKER_NETWORK_NAME}

###########################
#
# CI Build and Test Services
#
###########################

# server
server_ci: start_network
	make lint_server test_server push_server_container

install_server_packages:
	${DC_BUILD} build server_npm

build_server_source: install_server_packages
	${DC_BUILD} build server_typescript

lint_server: build_server_source
	${DC_BUILD} run server_typescript yarn lint

test_server: build_server_source
	${DC_BUILD} run server_typescript yarn test

build_application_server_container: test_server lint_server
	${DC_BUILD} build reviewer_server

push_server_container: build_application_server_container
	${PUSH_COMMAND} reviewer_server

# continuum-auth
continuum-auth_ci: start_network
	make lint_continuum-auth test_continuum-auth push_continuum-auth_container

install_continuum-auth_packages:
	${DC_BUILD} build continuum-auth_npm

build_continuum-auth_source: install_continuum-auth_packages
	${DC_BUILD} build continuum-auth_typescript

lint_continuum-auth: build_continuum-auth_source
	${DC_BUILD} run continuum-auth_typescript yarn lint

test_continuum-auth: build_continuum-auth_source
	${DC_BUILD} run continuum-auth_typescript yarn test

build_application_continuum-auth_container: test_continuum-auth lint_continuum-auth
	${DC_BUILD} build reviewer_continuum-auth

push_continuum-auth_container: build_application_continuum-auth_container
	@echo "Push the container to a docker registry"

# audit
audit_ci: start_network
	make lint_audit test_audit push_audit_container

install_audit_packages:
	${DC_BUILD} build audit_npm

build_audit_source: install_audit_packages
	${DC_BUILD} build audit_typescript

lint_audit: build_audit_source
	${DC_BUILD} run audit_typescript yarn lint

test_audit: build_audit_source
	${DC_BUILD} run audit_typescript yarn test

build_application_audit_container: test_audit lint_audit
	${DC_BUILD} build reviewer_audit

push_audit_container: build_application_continuum-auth_container
	@echo "Push the container to a docker registry"

local_ci:
	make -j 4 start_network
	make -j 4 server_ci continuum-auth_ci audit_ci

###########################
#
# Integration Tests
#
###########################

config_service_init: start_containers
	docker-compose exec etcd1 etcdctl put /Libero/version SSE
	docker-compose exec etcd1 etcdctl put /Org_A/Journal_A/Type S3
	docker-compose exec etcd1 etcdctl put /Org_A/Journal_A/Bucket Bucket_A
	docker-compose exec etcd1 etcdctl put /Org_A/Journal_A/ACL private
	docker-compose exec etcd1 etcdctl get --prefix /

start_config_service:
	docker-compose up etcd1

start_containers:
	# Has a soft dependency on build_server_container
	@echo "Starts running the newly built & pushed containers in testing mode"

run_api_tests: start_containers
	@echo "Run the api tests"
