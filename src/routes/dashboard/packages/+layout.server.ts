import type { LayoutServerLoad } from './$types';
// import type { PackageWithNestedData } from '$lib/types/custom';
import { env } from '$env/dynamic/private';

import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const getHeaders = new Headers({
		'Content-Type': 'application/json'
	});

	const getPackagesRequest = new Request(`${env.API_BASE_URL}/api/v1/package-tags/false/50`, {
		method: 'GET',
		mode: 'no-cors',
		referrerPolicy: 'strict-origin-when-cross-origin',
		headers: getHeaders
	});

	const getItemsRequest = new Request(`${env.API_BASE_URL}/api/v1/items`, {
		method: 'GET',
		mode: 'no-cors',
		referrerPolicy: 'strict-origin-when-cross-origin',
		headers: getHeaders
	});

	const getUomRequest = new Request(`${env.API_BASE_URL}/api/v1/uom`, {
		method: 'GET',
		mode: 'no-cors',
		referrerPolicy: 'strict-origin-when-cross-origin',
		headers: getHeaders
	});

	try {
		const packageResponse = await fetch(getPackagesRequest);
		console.log(packageResponse);
		const packages = await packageResponse.json();

		const itemResponse = await fetch(getItemsRequest);
		console.log(packageResponse);
		const items = await itemResponse.json();

		const uomResponse = await fetch(getUomRequest);
		console.log(packageResponse);
		const uom = await uomResponse.json();

		return {
			packages,
			items,
			uom
		};
	} catch (err) {
		return error(500, 'Error loading packages');
	}
};
