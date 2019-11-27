stop: 
	docker-compose down
	docker-compose -f docker-compose.infra.yml down
	docker network rm infra_postgres
	docker network rm infra_api
	docker network rm infra_rabbit

start:
	-docker network create infra_postgres
	-docker network create infra_api
	-docker network create infra_rabbit
	-docker-compose -f docker-compose.infra.yml up -d
	-docker-compose up -d

setup:
	if [ ! -e .env ] ; then ln -s .env.example .env ; fi
	if [ ! -e ./config/server/config.json ] ; then cp config/server/config.example.json config/server/config.json ; fi
	if [ ! -e ./config/server/newrelic.js ] ; then cp config/server/newrelic.example.js config/server/newrelic.js ; fi
	git submodule init
	git submodule update

follow_logs:
	-docker-compose -f docker-compose.yml logs -f

