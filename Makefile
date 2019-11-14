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
	git submodule init
	git submodule update

follow_logs:
	-docker-compose -f docker-compose.yml logs -f

