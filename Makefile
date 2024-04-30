dev-build:
	docker compose -f docker-compose.yml build

dev-up:
	docker compose -f docker-compose.yml up -d

dev-down:
	docker compose -f docker-compose.yml down
