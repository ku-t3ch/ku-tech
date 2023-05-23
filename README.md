# KU Tech Website

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

NEXT_PUBLIC_GA_MEASUREMENT_ID=G-

EMAIL_USER=""
EMAIL_PASS=""

GOOGLE_CLIENT_ID=

S3=

NEXT_PUBLIC_GRAPHQL_URL=

NODE_ENV="production"
```
---
## Docker Build
```bash
docker build -t ku-tech .
```