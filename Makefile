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