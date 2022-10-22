import type { PageServerLoad } from './$types';
// import type { PackageWithNestedData } from '$lib/types/custom';

import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const res = await fetch('http://localhost:3000/orders');
		const orders = await res.json();

		return {
			orders
		};
	} catch (err) {
		return error(500, 'Error loading orders');
	}
};
