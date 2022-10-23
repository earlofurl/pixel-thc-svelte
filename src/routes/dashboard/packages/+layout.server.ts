import type { LayoutServerLoad } from './$types';
// import type { PackageWithNestedData } from '$lib/types/custom';

import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ fetch }) => {
	try {
		const packageResponse = await fetch('http://localhost:3000/packages');
		const packages = await packageResponse.json();

		const itemResponse = await fetch('http://localhost:3000/items');
		const items = await itemResponse.json();

		const uomResponse = await fetch('http://localhost:3000/uom');
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
