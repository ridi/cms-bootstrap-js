.PHONY: install cms-up cms-down

install:
	git submodule init
	git submodule update
	cp cms/.env.sample cms/.env
	make -C cms install
	npm install

cms-up:
	make -C cms up

cms-db:
	make -C cms db-migrate

cms-down:
	make -C cms down
