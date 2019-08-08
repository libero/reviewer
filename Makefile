
help:
	@echo "Libero reviewer CI Makefile"
	@echo "---"
	@echo "The purpose of this file is to help clean up the ci-config"
	@echo "and to make it easier to switch CI providers if necessary"

build-server:
	@echo "Build and test"
	cd server/ && yarn
	cd server/ && yarn lint
	cd server/ && yarn build
	cd server/ && yarn test
	@echo "Build docker containers"

build-client:
	@echo "Build and test"
	cd client/ && yarn
	cd client/ && yarn lint
	cd client/ && yarn build
	cd client/ && yarn test
	@echo "Build docker containers"
