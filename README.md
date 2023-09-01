# D5 PoweredBy

This repository is a `node.js` full stack code baseline for building a Franchise portal with the BigCommerce PoweredBy API. It contains a template for a mono-repo to run an API based on [nestjs](https://nestjs.com/) as well as `React` based frontend.

## Technologies used

- Node.js >= 18.10
- Yarn
- Yarn workspaces
- Turbo
- Docker
- Postgres >= 13
- Typescript
- React and related ecosystem
- Antd
- Vite
- ESLint
- Nestjs and related ecosystem
- Prisma
- Swagger

## Workspaces

We are using turborepo for mono-repo implementation. Please check the link below to learn more about turborepo:

[Turborepo Quickstart – Turborepo](https://turbo.build/repo/docs)

These workspaces are defined in this baseline already.

```
apps
  - api: @d5/api
  - portal: @d5/portal
packages
  - eslint-config-d5
  - tsconfig: @d5/tsconfig
  - hooks: @d5/hooks
  - rbac: @d5/rbac
  - rich-text: @d5/rich-text
  - ui: @d5/ui
```

## Usage

To get started this baseline, you need to fork it as your own repository to keep tracking the upgrade of this baseline. Please check the links below to learn more about the fork and workflow:

- [GitHub - Fork a Repo](https://help.github.com/articles/fork-a-repo)
- [GitHub - Syncing a Fork](https://help.github.com/articles/syncing-a-fork)
- [GitHub - Checking Out a Pull Request](https://help.github.com/articles/checking-out-pull-requests-locally)
- [GitHub - Contributing to projects](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)

## Setup guide

#### Get started

Once you get your repository and branch setted, please enter root folder and flow the steps below to get started:

1. `yarn install`

2. `yarn prepare`

3. `docker-compose up -d`

4. create a database `d5-api`

5. `yarn prisma:push`

6. `yarn prisma:seed`

7. follow the `env.sample` to add `.env.localdev.local` to `apps/portal` folder

8. follow the `env.sample` to add `.env` to `apps/api` folder

9. `yarn start:dev` is available for local dev to start all the workspaces. `yarn start:dev --filter @d5/api` and `yarn start:dev --filter @d5/portal` are avaiable for running api and portal seperately.

10. Visit the links from command line to visit the url locally, the default urls shoud be:

    - api:  `http://localhost:3000`

    - swagger docs: `http://localhost:3000/apidoc`

    - portal: `http://localhost:5173`

#### Customization

1. Portal is only a full sample for implementing frontend app, you can use it directly if you don't need any customization.

2. API: We don't recommand to make any changes in the `api/src` folder, all the cusomization should be limited in the `api/custom` folder.

#### API Customization

```
# create a new module

$ nest g resource custom/my-module

# update db migration

$ npx prisma db push

# start console to run commands

$ yarn console
```

#### DB schema Customization

[Prismix](https://github.com/jamiepine/prismix) The Prisma schema mixer is used for splitting the schema into individual modules.
Refer to sample code apps/api/custom/sample/sample.prisma to see how to customize module based db schema.

```
# generate new schema !!!important!!!

$ yarn prismix
```


#### API File Structure

- dto - request parameters validation
- entity - response formatter
- module - module dependencies, imports and definitions
- controller - routes and controllers
- service - model and database operations
- processor - task queue handler

#### DTO Usage

it depends on [class-validator](https://github.com/typestack/class-validator) and [class-transformer](https://github.com/typestack/class-transformer)

- for normal validation, here is the documentation: [Types and parameters](https://docs.nestjs.com/openapi/types-and-parameters)
- for custom validation, here is the documentation: [class-transformer-validator](https://github.com/MichalLytek/class-transformer-validator)

## Deployment:

1. There is a sample in `.github/workflow` which deploying portal code to AWS S3 bucket behind AWS Cloudfront as the CDN

2. For API deployment, it is recommended to to use github action to deploy to AWS ECS for production with autoscale options. But for standalone server, we can use docker-compose to serve it. Checkout following Jenkins shell command for example:

   ```
   cat << EOF > apps/api/.env
   DATABASE_URL=postgresql://postgres:password@nest_postgres:5432/d5-api?schema=public
   JWT_SECRET_KEY=xxxxxxxxxxxxxxxxx
   JWT_REFRESH_SECRET_KEY=JWT_SECRET_KEY=xxxxxxxxxxxxxxxxx
   DEFAULT_LOGIN_PASSWORD=xxxxxxxxxxxxxxxxx
   AWS_S3_ACCESS_KEY_ID=xxxxxxxxxxxxxxx
   AWS_S3_SECRET_ACCESS_KEY=xxxxxxxx
   AWS_S3_BUCKET_NAME=xxx-user-files
   AWS_S3_REGION_NAME=us-west-2
   AWS_S3_BASE_URL=https://xxx-user-files.s3.amazonaws.com
   EMAIL_HOST=mail.server.com
   EMAIL_PORT=587
   EMAIL_HOST_USER=xxxxxx
   EMAIL_HOST_PASSWORD=xxxxxx
   FROM_EMAIL=no-reply@d5.com
   EMAIL_USE_TLS=on
   EMAIL_USE_SSL=off
   REDIS_HOST=redis
   REDIS_PORT=6379
   BASE_APP_URL=<PORTAL APP URL>
   BASE_APP_BE_URL=<APIURL>
   BC_PBY_DOMAIN=https://api.bigcommerce.com
   BC_PBY_DOMAIN_MOCK=https://stoplight.io/mocks/bigcommerce/promotions/89147951
   BC_PBY_DOMAIN_MOCK_CATALOG=https://stoplight.io/mocks/bigcommerce/api-reference/2313492
   BC_PBY_DOMAIN_MOCK_STOREFRONT=https://stoplight.io/mocks/bigcommerce/api-reference
   BC_PBY_DOMAIN_MOCK_ORDER=https://stoplight.io/mocks/bigcommerce/api-beta-buy-online-pick-up-in-store/2316470
   BC_PBY_DOMAIN_MOCK_COUPON=https://stoplight.io/mocks/bigcommerce/api-reference/2322741

   EOF

   docker-compose -f docker-compose-staging.yaml down --remove-orphans
   docker-compose -f docker-compose-staging.yaml up --build -d
   ```
