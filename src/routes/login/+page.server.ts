import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { customResponse } from '$lib/utils/misc';
// import { userRepository } from '$lib/Redis/dbRepository';
import * as bcrypt from 'bcrypt';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

export const actions: Actions = {
	default: async ({ request, cookies, fetch }) => {
		const form = await request.formData();
		const email = form.get('email') as string;
		const password = form.get('password') as string;

		const bodyObject = new URLSearchParams({
			email,
			password
		}).toString();

		if (!email || !password) return customResponse(400, false, 'Email and Password are required');

		if (typeof email !== 'string' || typeof password !== 'string')
			return customResponse(400, false, 'Enter a valid email and password.');

		const user = await fetch(`${env.API_BASE_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: bodyObject
		});
		// const passwordMatch = user && (await bcrypt.compare(password, user.password));

		if (!user) return customResponse(400, false, 'You entered the wrong credentials.');
		const userData = await user.json();

		cookies.set('session', userData.id, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: !dev,
			maxAge: 60 * 60 * 24 * 30
		});

		// return customResponse(200, true, 'User loggedIn successfully');

		throw redirect(307, '/dashboard');
	}
};
