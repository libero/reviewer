
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

DOCKER_NETWORK_NAME=reviewer_build

TRAVIS_COMMIT ?= "local"

DC_BUILD = IMAGE_TAG=${TRAVIS_COMMIT} docker-compose -f docker-compose.build.yml

###########################
#
# Docker Setup
#
###########################

start_network:
	-docker network create ${DOCKER_NETWORK_NAME}

###########################
#
# CI Build and Test
#
###########################

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
	@echo "Push the container to a docker registry"

client_ci: start_network
	make build_client_container

install_client_packages:
	${DC_BUILD} build client_npm

build_client_source: install_client_packages
	${DC_BUILD} build client_webpack

lint_client: build_client_source
	${DC_BUILD} run client_webpack yarn lint

test_client: build_client_source 
	${DC_BUILD} run client_webpack yarn test 

build_client_container: test_client build_client_source
	${DC_BUILD} build reviewer_client

local_ci:
	make -j 4 server_ci client_ci

###########################
#
# Integration Tests
#
###########################

start_containers:
	# Has a soft dependency on build_server_container and build_client_containe
	@echo "Starts running the newly built & pushed containers in testing mode"

run_browser_tests: start_containers
	@echo "Run the browser tests"

run_api_tests: start_containers
	@echo "Run the api tests"
