import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { customResponse } from '$lib/utils/misc';
// import { userRepository } from '$lib/Redis/dbRepository';
import * as bcrypt from 'bcrypt';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

export const actions: Actions = {
	default: async ({ request, cookies, fetch, locals }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		const bodyObject = new URLSearchParams({
			email,
			password
		}).toString();

		if (!email || !password) return customResponse(400, false, 'Email and Password are required');

		if (typeof email !== 'string' || typeof password !== 'string')
			return customResponse(400, false, 'Enter a valid email and password.');

		try {
			const userRes = await fetch(`${env.API_BASE_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: bodyObject
			});
			// get user data from response and set to locals
			const userObj = await userRes.json();
			locals.user = userObj.passport.user;

			// set cookie with session id
			cookies.set('session', userRes.headers.get('Set-Cookie'), {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: !dev,
				maxAge: 60 * 60 * 24 * 30
			});

			throw redirect(307, '/dashboard');
		} catch (error) {
			const message = `Error in endpoint /login: ${error}`;
			return {
				status: 500,
				body: message
			};
		}
	}
};
