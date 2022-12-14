import type { PageServerLoad } from './$types';
// import type { PackageWithNestedData } from '$lib/types/custom';
import { env } from '$env/dynamic/private';

import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	const getHeaders = new Headers({
		'Content-Type': 'application/json'
	});

	const getOrdersRequest = new Request(`${env.API_BASE_URL}/api/v1/orders`, {
		method: 'GET',
		mode: 'cors',
		credentials: 'same-origin',
		referrerPolicy: 'strict-origin-when-cross-origin',
		headers: getHeaders
	});

	try {
		const res = await fetch(getOrdersRequest);
		const orders = await res.json();

		return {
			orders
		};
	} catch (err) {
		return error(500, 'Manual SK errormsg: Error loading orders');
	}
};
