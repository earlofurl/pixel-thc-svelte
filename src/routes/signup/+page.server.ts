import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { customResponse } from '$lib/utils/misc';
import { env } from '$env/dynamic/private';
import { ok, err } from 'neverthrow';

export const actions: Actions = {
	default: async ({ request, fetch, locals }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const username = data.get('username') as string;
		const password = data.get('password') as string;
		const passwordConfirm = data.get('confirm-password') as string;
		const firstName = data.get('first-name') as string;
		const lastName = data.get('last-name') as string;
		const phone = data.get('phone') as string;

		if (typeof email !== 'string' || typeof password !== 'string') {
			return customResponse(400, false, 'Enter a valid email and password.');
		}

		// compare password and passwordConfirm
		if (password !== passwordConfirm) {
			return customResponse(400, false, 'Passwords do not match.');
		}

		const bodyObject = new URLSearchParams({
			email,
			username,
			password,
			confirmationPassword: passwordConfirm,
			firstName,
			lastName,
			phone,
			role: 'STANDARD'
		}).toString();

		try {
			const userRes = await fetch(`${env.API_BASE_URL}/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: bodyObject
			});
			// get user data from response and set to locals
			const userObj = await userRes.json();
			locals.user = userObj.passport.user;

			throw redirect(307, '/dashboard');
		} catch (error) {
			const message = `Error in endpoint /signup: ${error}`;
			return {
				status: 500,
				body: message
			};
		}
	}
};
