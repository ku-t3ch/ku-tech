# KU Tech Website
> Working on branch ***develop*** only, When you need deploy please merge to branch ***main*** by open pull request
>

## Setup

```bash
npm install yarn -g
``` 

```bash
yarn install --frozen-lockfile
``` 

```bash
yarn dev
``` 
---
## Env
```js
DATABASE_URL=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Cloudfare Turnstile
CT_SECRET=

# Google Recaptcha
RECAPTCHA_SECRET=

EMAIL_USER=""
EMAIL_PASS=""

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

S3=

NODE_ENV=
S3_ENV_TYPE=

NEXT_SHARP_PATH=/tmp/node_modules/sharp

GOOGLE_SERVICE_ACCOUNTS=
BUDGET_SPREADS_SHEET_ID=
REDIS_URL=
```
---
## Docker Build
```bash
docker build -t ku-tech --build-arg NEXT_PUBLIC_CT_SITE_KEY="" --build-arg NEXT_PUBLIC_RECAPTCHA_SITE_KEY="" --build-arg NEXT_PUBLIC_GA_MEASUREMENT_ID="" --build-arg NEXT_PUBLIC_GRAPHQL_URL="" .
```