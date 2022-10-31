import type { Handle, HandleFetch } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import debug from 'debug';
import { env } from '$env/dynamic/private';
import cookie from 'cookie';

const log = debug('app:hooks.server');

export const getSession = async ({ event }) => {
	if (event.locals.user) {
		// console.log('event.locals.user', JSON.stringify(event.locals.user));
		return { user: event.locals.user };
	}
	return {};
};

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	const user = await getSession({ event });

	// allow access to login, registration, and password reset for non-authenticated users
	const allowedPaths = ['/login', '/signup', '/forgot-password', '/reset-password'];

	if (allowedPaths.includes(event.url.pathname)) {
		return resolve(event);
	}

	if (cookies.session && user) {
		return resolve(event);
	}

	return Response.redirect(event.url.origin + '/login');
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	try {
		if (request.url.startsWith(`${env.API_BASE_URL}/api/v1`)) {
			request.headers.set('cookie', event.cookies.get('session'));
		}
		return fetch(request);
	} catch (err) {
		return error(500, 'Custom SK errormsg: Error in handleFetch hook');
	}
};
