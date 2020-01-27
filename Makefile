DOCKER_COMPOSE = docker-compose
DOCKER_COMPOSE_INFRA = docker-compose -f docker-compose.infra.yml

stop: 
	docker-compose down
	docker-compose -f docker-compose.infra.yml down
	docker network rm infra_postgres
	docker network rm infra_api
	docker network rm infra_rabbit

start:
	$(MAKE) create_networks
	-${DOCKER_COMPOSE_INFRA} up -d
	-${DOCKER_COMPOSE} up -d
	-${DOCKER_COMPOSE} exec audit node dist/migrate.js run
	-${DOCKER_COMPOSE} exec continuum-adaptor node dist/migrate.js run

create_networks:
	-docker network create infra_postgres
	-docker network create infra_api
	-docker network create infra_rabbit

setup:
	if [ ! -e .env ] ; then ln -s .env.example .env ; fi
	$(MAKE) setup_gitmodules
	$(MAKE) setup_config
	${MAKE} setup_databases

setup_config:
	if [ ! -e ./config/audit/config.json ] ; then cp config/audit/config.example.json config/audit/config.json ; fi
	if [ ! -e ./config/client/config.public.json ] ; then cp config/client/config.public.example.json config/client/config.public.json ; fi
	if [ ! -e ./config/client/config.infra.json ] ; then cp config/client/config.infra.example.json config/client/config.infra.json ; fi
	if [ ! -e ./config/continuum-adaptor/config.json ] ; then cp config/continuum-adaptor/config.example.json config/continuum-adaptor/config.json ; fi
	if [ ! -e ./config/reviewer-mocks/config.json ] ; then cp config/reviewer-mocks/config.example.json config/reviewer-mocks/config.json ; fi
	if [ ! -e ./config/server/config.json ] ; then cp config/server/config.example.json config/server/config.json ; fi
	if [ ! -e ./config/server/newrelic.js ] ; then cp config/server/newrelic.example.js config/server/newrelic.js ; fi

setup_gitmodules:
	git submodule update --init --recursive

setup_databases:
	$(MAKE) create_networks
	-${DOCKER_COMPOSE_INFRA} up -d postgres
	-${DOCKER_COMPOSE_INFRA} exec postgres psql -U postgres -c 'CREATE DATABASE reviewer_audit';
	-${DOCKER_COMPOSE_INFRA} exec postgres psql -U postgres -c 'CREATE DATABASE reviewer_continuum_adaptor';
	-${DOCKER_COMPOSE_INFRA} down

clean_databases:
	$(MAKE) create_networks
	-${DOCKER_COMPOSE_INFRA} up -d postgres
	-${DOCKER_COMPOSE_INFRA} down -v

follow_logs:
	-docker-compose -f docker-compose.yml logs -f

