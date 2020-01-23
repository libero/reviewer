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
	if [ ! -e ./config/audit/config.json ] ; then cp config/audit/config.example.json config/audit/config.json ; fi
	if [ ! -e ./config/client/config.public.json ] ; then cp config/client/config.public.example.json config/client/config.public.json ; fi
	if [ ! -e ./config/client/config.infra.json ] ; then cp config/client/config.infra.example.json config/client/config.infra.json ; fi
	if [ ! -e ./config/continuum-adaptor/config.json ] ; then cp config/continuum-adaptor/config.example.json config/continuum-adaptor/config.json ; fi
	if [ ! -e ./config/reviewer-mocks/config.json ] ; then cp config/reviewer-mocks/config.example.json config/reviewer-mocks/config.json ; fi
	if [ ! -e ./config/server/config.json ] ; then cp config/server/config.example.json config/server/config.json ; fi
	if [ ! -e ./config/server/newrelic.js ] ; then cp config/server/newrelic.example.js config/server/newrelic.js ; fi
	git submodule init
	git submodule update

follow_logs:
	-docker-compose -f docker-compose.yml logs -f

