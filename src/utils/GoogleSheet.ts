import { env } from '@/env.mjs';
import { GoogleAuth, JWTInput } from 'google-auth-library';

const credentials = JSON.parse(env.GOOGLE_SERVICE_ACCOUNTS) as JWTInput;

const auth = new GoogleAuth({
	credentials: {
		...credentials,
		private_key: credentials.private_key!!.split(String.raw`\n`).join('\n'),
	},
	scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

export { auth };