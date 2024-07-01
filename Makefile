.PHONY: dev-init dev-build dev-up dev-down dev-seed dev-destroy \
	prod-init prod-build prod-up prod-down prod-seed prod-destroy \
	test e2e-test clean-project generate-schema

# 開発環境用コマンド
# 1. dev-build: 開発環境用のDockerイメージをビルド
# 2. dev-up: 開発環境用のDockerコンテナを起動
# 3. DBのマイグレーション
# 4. DBのシードデータを投入
# 5. スキーマ生成
dev-init: dev-build dev-up dev-seed generate-schema
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
	docker compose -f docker-compose_development.yml run --rm app npm run db:migrate \
	&& docker compose -f docker-compose_development.yml run --rm app npm run db:seed

# 本番環境用コマンド
# 1. prod-build: 本番環境用のDockerイメージをビルド
# 2. prod-up: 本番環境用のDockerコンテナを起動
# 3. DBのマイグレーション
# 4. DBのシードデータを投入
# 5. スキーマ生成
prod-init: prod-build prod-up prod-seed generate-schema
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
	docker compose -f docker-compose_production.yml run --rm app npm run db:migrate \
	&& docker compose -f docker-compose_production.yml run --rm app npm run db:seed

# 静的ビルド用コマンド
static-build: generate-schema
	docker compose -f docker-compose_static.yml build \
	&& docker compose -f docker-compose_static.yml up

# テストコマンド
# 1. 単体テストの実行
# 2. 型チェック
# 3. Lint
test:
	cd app \
	&& npm run test \
	&& npm run type \
	&& npm run lint

# E2Eテストの実行
# 下記を前提とする
# 1. コンテナ環境が実行されていること
# 2. `npx playwright install --with-deps`でヘッドレスブラウザがインストールされていること
e2e-test:
	cd app \
	&& npm run test:e2e

# PrismaおよびGraphQLのスキーマ生成
generate-schema:
	cd app \
	&& npm run db:generate \
	&& npm run gqlgen

# プロジェクトのクリーンアップ(CI環境と状態を揃えるために使用する)
clean-project:
	cd app \
	&& sudo rm -rf node_modules \
	&& sudo rm -rf .next \
	&& sudo rm -rf src/gql \
	&& npm i