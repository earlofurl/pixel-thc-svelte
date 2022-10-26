import type { LayoutServerLoad } from './$types';
// import type { PackageWithNestedData } from '$lib/types/custom';
import { env } from '$env/dynamic/private';

import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ fetch }) => {
	// console.log(BASE_URL);
	try {
		const packageResponse = await fetch(`${env.BASE_URL}/packages`);
		const packages = await packageResponse.json();

		const itemResponse = await fetch(`${env.BASE_URL}/items`);
		const items = await itemResponse.json();

		const uomResponse = await fetch(`${env.BASE_URL}/uom`);
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
