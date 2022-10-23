import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const packageTagResponse = await fetch('http://localhost:3000/package-tags/false/50');
		const packageTags = await packageTagResponse.json();

		return {
			packageTags
		};
	} catch (err) {
		return error(500, 'Error loading package tags');
	}
};
