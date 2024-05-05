.PHONY: dev-init dev-build dev-up dev-down

dev-init: dev-build dev-up
	# スキーマの作成はDockerfile内で行う
	echo "Init done"

dev-build:
	docker compose -f docker-compose_development.yml build

dev-up:
	docker compose -f docker-compose_development.yml up -d

dev-down:
	docker compose -f docker-compose_development.yml down

dev-destroy:
	docker compose -f docker-compose_development.yml down --rmi all --volumes --remove-orphans

dev-seed:
	docker compose -f docker-compose_development.yml run --rm app npm run db:migrate &&
	docker compose -f docker-compose_development.yml run --rm app npm run db:seed

prod-init: prod-build prod-up
	echo "Init done"

prod-build:
	docker compose -f docker-compose_production.yml build

prod-up:
	docker compose -f docker-compose_production.yml up -d

prod-down:
	docker compose -f docker-compose_production.yml down

prod-destroy:
	docker compose -f docker-compose_production.yml down --rmi all --volumes --remove-orphans

prod-seed:
	docker compose -f docker-compose_production.yml run --rm app npm run db:migrate &&
	docker compose -f docker-compose_production.yml run --rm app npm run db:seed
