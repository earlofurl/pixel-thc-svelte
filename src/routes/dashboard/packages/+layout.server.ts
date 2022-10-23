import type { LayoutServerLoad } from './$types';
// import type { PackageWithNestedData } from '$lib/types/custom';

import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ fetch }) => {
	try {
		const packageResponse = await fetch('http://localhost:3000/packages');
		const packages = await packageResponse.json();

		const itemResponse = await fetch('http://localhost:3000/items');
		const items = await itemResponse.json();

		return {
			packages,
			items
		};
	} catch (err) {
		return error(500, 'Error loading packages');
	}
};
