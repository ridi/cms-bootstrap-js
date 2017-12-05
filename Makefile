.PHONY: install cms-up cms-down migrate-samples

build:
	composer install
	npm install

migrate-samples:
	vendor/bin/phinx migrate
	vendor/bin/phinx seed:run

cms-up:
	docker-compose up

cms-down:
	docker-compose down
