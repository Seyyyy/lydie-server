.PHONY: dev-init dev-build dev-up dev-down dev-seed dev-destroy \
	prod-init prod-build prod-up prod-down prod-seed prod-destroy \
	test

# 開発環境用コマンド
# 1. dev-build: 開発環境用のDockerイメージをビルド(PrismaおよびGraphQLのスキーマ生成を含む)
# 2. dev-up: 開発環境用のDockerコンテナを起動
# 3. DBのマイグレーション
# 4. DBのシードデータを投入
dev-init: dev-build dev-up
	echo "Init done" \
	&& docker compose -f docker-compose_development.yml run --rm app npm run db:migrate \
	&& docker compose -f docker-compose_development.yml run --rm app npm run db:seed

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

# 本番環境用コマンド
# 1. prod-build: 本番環境用のDockerイメージをビルド(PrismaおよびGraphQLのスキーマ生成を含む)
# 2. prod-up: 本番環境用のDockerコンテナを起動
# 3. DBのマイグレーション
# 4. DBのシードデータを投入
prod-init: prod-build prod-up
	echo "Init done" \
	&& docker compose -f docker-compose_production.yml run --rm app npm run db:migrate \
	&& docker compose -f docker-compose_production.yml run --rm app npm run db:seed

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

# テストコマンド
# 1. 単体テストの実行
# 2. 型チェック
# 3. Lint
test:
	cd app \
	&& npm run test \
	&& npm run type \
	&& npm run lint