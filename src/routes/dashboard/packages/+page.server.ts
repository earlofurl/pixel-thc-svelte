import type { PageServerLoad } from './$types';
// import type { PackageWithNestedData } from '$lib/types/custom';

import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const res = await fetch('http://localhost:3000/packages');
		const packages = await res.json();

		return {
			packages
		};
	} catch (err) {
		return error(500, 'Error loading packages');
	}
};
