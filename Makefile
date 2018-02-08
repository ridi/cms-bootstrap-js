.PHONY: install cms-up cms-down

install:
	git submodule init
	git submodule update
	cp cms-docker-compose/.env.sample cms-docker-compose/.env
	make -C cms-docker-compose install
	npm install

cms-up:
	make -C cms-docker-compose up

cms-db:
	make -C cms-docker-compose db-migrate

cms-down:
	make -C cms-docker-compose down
