import type { PageServerLoad } from './$types';
// import type { PackageWithNestedData } from '$lib/types/custom';
import { BASE_URL } from '$env/static/private';

import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const res = await fetch(`${BASE_URL}/orders`);
		const orders = await res.json();

		return {
			orders
		};
	} catch (err) {
		return error(500, 'Error loading orders');
	}
};
