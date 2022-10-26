import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const dummyData = await fetch(
			'https://hub.dummyapis.com/products?noofRecords=2&idStarts=1001&currency=usd'
		);
		const data = await dummyData.json();

		return {
			data
		};
	} catch (err) {
		return error(500, 'Error loading data');
	}
};
