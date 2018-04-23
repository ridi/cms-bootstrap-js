.PHONY: install cms-up cms-down

install:
	git submodule init
	git submodule update
	make -C cms install
	make -C cms pull
	npm install

cms-up:
	make -C cms up

cms-db:
	make -C cms db-migrate

cms-down:
	make -C cms down
