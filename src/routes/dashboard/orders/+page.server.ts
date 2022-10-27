import type { PageServerLoad } from './$types';
// import type { PackageWithNestedData } from '$lib/types/custom';
import { env } from '$env/dynamic/private';

import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const res = await fetch(`${env.BASE_URL}/orders`, {
			credentials: 'include',
			headers: { accept: 'application/json' }
		});
		// const res = await fetch(`0.0.0.0:3420/api/v1/orders`);
		const orders = await res.json();

		return {
			orders
		};
	} catch (err) {
		return error(500, 'Error loading orders');
	}
};
