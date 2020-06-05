DOCKER_COMPOSE = docker-compose -f docker-compose.yml
DOCKER_COMPOSE_INFRA = docker-compose -f docker-compose.infra.yml

BROWSERTEST_SEMVER = `./browsertest-image-version.sh docker-compose.yml`
BROWSERTEST_MASTER = `./browsertest-image-version.sh docker-compose.master.yml`

stop:
	docker-compose -f docker-compose.yml down
	docker-compose -f docker-compose.infra.yml down
	docker network rm infra_postgres
	docker network rm infra_api

start_infra:
	-${DOCKER_COMPOSE_INFRA} up -d s3 postgres
	./.scripts/docker/wait-healthy.sh reviewer_postgres_1 20
	./.scripts/docker/wait-healthy.sh reviewer_s3_1 30
	${DOCKER_COMPOSE_INFRA} up -d s3_create-bucket

start: create_networks start_infra
	-${DOCKER_COMPOSE} up -d

start_master: create_networks start_infra
	-${DOCKER_COMPOSE} -f docker-compose.master.yml up -d

create_networks:
	-docker network create infra_postgres
	-docker network create infra_api

setup:
	$(MAKE) setup_gitmodules

setup_gitmodules:
	git submodule update --init --recursive

clean_databases:
	$(MAKE) create_networks
	-${DOCKER_COMPOSE_INFRA} up -d postgres
	-${DOCKER_COMPOSE_INFRA} down -v

follow_logs:
	-docker-compose -f docker-compose.yml logs -f

wait_healthy_apps:
	./.scripts/docker/wait-healthy.sh reviewer_reviewer-mocks_1 30
	./.scripts/docker/wait-healthy.sh reviewer_submission_1 20
	./.scripts/docker/wait-healthy.sh reviewer_client_1 60
	./.scripts/docker/wait-healthy.sh reviewer_continuum-adaptor_1 20
	./.scripts/docker/wait-healthy.sh reviewer_nginx_1 20

test_integration: setup start
	make wait_healthy_apps
	docker run --network infra_api -e BASE_URL="reviewer_nginx_1:9000" $(BROWSERTEST_SEMVER)

test_integration_master: setup start_master
	make wait_healthy_apps
	docker run --network infra_api -e BASE_URL="reviewer_nginx_1:9000" $(BROWSERTEST_MASTER)
