import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const hello = 'Hello dashboard!';
	return { hello };
};
