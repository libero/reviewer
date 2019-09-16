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

TRAVIS_BRANCH ?= `git rev-parse --abbrev-ref HEAD -- | head -n 1`
TRAVIS_PULL_REQUEST ?= false

# Control where we build from
ifeq "${TRAVIS_PULL_REQUEST}" "false"
ORIGIN_BRANCH = master
COMPARE_REF = ${TRAVIS_BRANCH}
else
ORIGIN_BRANCH = master^
COMPARE_REF = HEAD
endif

# TODO: Make this generic somehow
define CONDITIONAL_BUILD =
ifneq "$(strip $(filter lib/%, $(shell git diff --name-only ${ORIGIN_BRANCH}...${TRAVIS_BRANCH})))" ""
lib_if_needed:
	make lib_ci
else ifeq ("${TRAVIS_BRANCH}", "master")
lib_if_needed:
	ifeq ("${TRAVIS_PULL_REQUEST}", "false")
	@echo "working on master building everything"
	make lib_ci
	else
	@echo "this is a pr, no action necessary"
	endif
else
lib_if_needed:
	@echo "no need to build lib"
endif
endef

###########################
#
# Docker Setup
#
###########################

start_network:
	-docker network create ${DOCKER_NETWORK_NAME}

###########################
#
# Build Shared Lib Container
#
###########################

prepare_shared_container: build_shared_package_container
	@echo "built shared components"

build_shared_package_container:
	${DC_BUILD} build shared_packages

lib_ci: start_network
	make build_auth-utils build_event-bus

lib_if_needed:
ifneq "$(strip $(filter lib/%, $(shell git diff --name-only ${ORIGIN_BRANCH}...${TRAVIS_BRANCH})))" ""
	make lib_ci
else ifeq ("${TRAVIS_BRANCH}", "master")
ifeq ("${TRAVIS_PULL_REQUEST}", "false")
	@echo "working on master building everything"
	make lib_ci
else
	@echo "this is a pr, no action necessary"
endif
endif

build_auth-utils: build_shared_package_container
	${DC_BUILD} run shared_packages sh -c "cd /lib/auth-utils && yarn lint"
	${DC_BUILD} run shared_packages sh -c "cd /lib/auth-utils && yarn test"

build_event-bus: build_shared_package_container
	${DC_BUILD} run shared_packages sh -c "cd /lib/event-bus && yarn lint"
	${DC_BUILD} run shared_packages sh -c "cd /lib/event-bus && yarn test"

###########################
#
# CI Build and Test Services
#
###########################

server_ci: start_network
	make lint_server test_server push_server_container

server_if_needed:
ifneq "$(strip $(filter server/%, $(shell git diff --name-only ${ORIGIN_BRANCH}...${TRAVIS_BRANCH})))" ""
	make server_ci
else ifeq ("${TRAVIS_BRANCH}", "master")
ifeq ("${TRAVIS_PULL_REQUEST}", "false")
	@echo "working on master building everything"
	make server_ci
else
	@echo "this is a pr, no action necessary"
endif
endif

install_server_packages: prepare_shared_container
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

client_ci: start_network
	make build_client_container

client_if_needed:
ifneq "$(strip $(filter client/%, $(shell git diff --name-only ${ORIGIN_BRANCH}...${TRAVIS_BRANCH})))" ""
	@echo "found a change, building this"
	make client_ci
else ifeq ("${TRAVIS_BRANCH}", "master")
ifeq ("${TRAVIS_PULL_REQUEST}", "false")
	@echo "working on master building everything"
	make client_ci
else
	@echo "this is a pr, no action necessary"
endif
endif

install_client_packages: prepare_shared_container
	${DC_BUILD} build client_npm

build_client_source: install_client_packages
	${DC_BUILD} build client_webpack

lint_client: build_client_source
	${DC_BUILD} run client_webpack yarn lint

test_client: build_client_source
	${DC_BUILD} run client_webpack yarn test

build_client_container: test_client build_client_source
	${DC_BUILD} build reviewer_client

# continuum-auth
continuum-auth_ci: start_network
	make lint_continuum-auth test_continuum-auth push_continuum-auth_container

continuum-auth_if_needed:
ifneq "$(strip $(filter continuum-auth/%, $(shell git diff --name-only ${ORIGIN_BRANCH}...${TRAVIS_BRANCH})))" ""
	make continuum-auth_ci
else ifeq ("${TRAVIS_BRANCH}", "master")
ifeq ("${TRAVIS_PULL_REQUEST}", "false")
	@echo "working on master building everything"
	make continuum-auth_ci
else
	@echo "this is a pr, no action necessary"
endif
endif

install_continuum-auth_packages: prepare_shared_container
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

local_ci:
	make -j 4 lib_ci
	make -j 4 server_ci continuum-auth_ci client_ci

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
	# Has a soft dependency on build_server_container and build_client_containe
	@echo "Starts running the newly built & pushed containers in testing mode"

run_browser_tests: start_containers
	@echo "Run the browser tests"

run_api_tests: start_containers
	@echo "Run the api tests"
