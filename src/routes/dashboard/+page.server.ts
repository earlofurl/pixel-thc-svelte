import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const hello = 'Hello dashboard!';
	if (locals.user) {
		const { user } = locals;
		return { hello, user };
	}
	return { hello };
};
