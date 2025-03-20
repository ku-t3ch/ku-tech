# KU Tech Website
> Working on branch ***develop*** only, When you need deploy please merge to branch ***main*** by open pull request
> test test

## Setup

```bash
npm install yarn -g
``` 

```bash
yarn
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
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Email
EMAIL_USER=""
EMAIL_PASS=""

# Google Login
GOOGLE_CLIENT_ID=

# Storage Object
S3=

# Hygraph Headless CMS
NEXT_PUBLIC_GRAPHQL_URL=

NODE_ENV="production"
SKIP_ENV_VALIDATION=1
```
---
## Docker Build
```bash
docker build -t ku-tech --build-arg NEXT_PUBLIC_CT_SITE_KEY="" --build-arg NEXT_PUBLIC_RECAPTCHA_SITE_KEY="" --build-arg NEXT_PUBLIC_GA_MEASUREMENT_ID="" --build-arg NEXT_PUBLIC_GRAPHQL_URL="" .
```
