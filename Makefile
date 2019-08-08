
help:
	@echo "Libero reviewer CI Makefile"
	@echo "---"
	@echo "The purpose of this file is to help clean up the ci-config"
	@echo "and to make it easier to switch CI providers if necessary"
	@echo ""
	@echo "To run the CI script locally, use `make all`, which will"
	@echo "start building all components in parallel"
	@echo ""
	@echo "If you aren't familliar with Makefile, there are a cople of"
	@echo "things you should know:"
	@echo "- each command runs in it's own shell, hence all the 'cd's"
	@echo "- the build targets are in the format <name>:[<dependencies>]"

TRAVIS_BUILD_NUMBER ?= local

###########################
#
# CI Build and Test
#
###########################

server_ci:
	make -j 4 lint_server build_server_container

install_server_packages:
	cd server/ && yarn

lint_server: install_server_packages
	cd server/ && yarn lint

build_server: install_server_packages
	cd server/ && yarn build

test_server: install_server_packages 
	# This does not require the code to be compiled beforehand
	cd server/ && yarn test

build_server_container: build_server test_server
	@echo "Move graphql schema into the dist directory"
	# The docker container needs the graphql schemas found in src but not dist
	cd server/ && mkdir -p gql
	cd server/ && bash -c 'find src | grep graphql | xargs -I {}  cp {} gql/'
	cd server/ && docker build -t libero/reviewer_server:$(TRAVIS_BUILD_NUMBER) .

push_server_container: build_server_container
	@echo "Push the container to a docker registry"

client_ci:
	make -j 4 lint_client build_client_container

install_client_packages:
	cd client/ && yarn

lint_client: install_client_packages
	cd client/ && yarn lint

build_client: install_client_packages
	cd client/ && yarn build

test_client: install_client_packages
	cd client/ && yarn test

build_client_container: build_client test_client
	cd client/ && docker build -t libero/reviewer_client:$(TRAVIS_BUILD_NUMBER) .

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
