/**
 * NOTE: You don't want to actually store the user in the cookie
 * we're doing this for demo purposes only so we don't need a database.
 */
import type { AuthAdapter } from './$types';
import type { User } from './utils/misc';
import type { Cookies } from '@sveltejs/kit';
import debug from 'debug';
import { err, ok } from 'neverthrow';
import { env } from '$env/dynamic/private';

const log = debug('app:lib:auth:cookie');

//  const seed_user: User = {
//      id: "seed-user-id",
//      email: "a@b.com",
//      password: "asdfasdf",
//      token: "seed-user-sesion-token",
//  };

const one_day = 60 * 60 * 24;
const maxAge = one_day * 365;

export const cookie: AuthAdapter = {
	async validate_session({ token, opts }) {
		const [_, session_token] = token.split(':');

		// TODO: add Zod
		if (!opts?.cookies) throw new Error('must pass cookies in to options');
		if (!token) return err(new Error('no token provided'));

		const user = get_user(opts.cookies);

		log('user:', user);

		//  const user = users.find((user: User) => user.token === session_token);

		if (!user) return err(new Error('no user found'));

		return ok(user);
	}

	// async signup({ email, password, password_confirm, opts }) {
	// 	// TODO: add Zod
	// 	if (!opts?.cookies) return err(new Error('must pass cookies in to options'));
	// 	if (!email) return err(new Error('email is required'));
	// 	if (!password) return err(new Error('password is required'));
	// 	if (password !== password_confirm) return err(new Error('passwords do not match'));

	// 	const token = generate_token();
	// 	const user = { id: generate_token(), email, password, token };
	// 	const users = get_users(opts.cookies);

	// 	set_users(opts.cookies, [...users, user]);

	// 	return ok(user);
	// },

	// async logout({ token, opts }) {
	// 	if (!opts?.cookies) return err(new Error('must pass cookies in to options'));
	// 	//  const token = cookies.get("auth_token") as string;
	// 	opts.cookies.delete('auth_token', { path: '/' });

	// 	// Remove token from the user
	// 	set_users(
	// 		opts.cookies,
	// 		get_users(opts.cookies).map((u) => {
	// 			if (u.token === token) u.token = undefined;
	// 			return u;
	// 		})
	// 	);

	// 	return;
	// }
};

function get_user(cookies: Cookies): User {
	const stored = cookies.get('user');
	if (stored) return JSON.parse(stored);
	return {} as User;
}

function set_user(cookies: Cookies, user: User) {
	cookies.set('user', JSON.stringify(user), { path: '/', maxAge });
}

function generate_token() {
	return Math.random().toString(36).slice(2);
}
