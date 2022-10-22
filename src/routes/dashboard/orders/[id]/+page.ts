import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	try {
		return {
			orderId: params.id
		};
	} catch (err) {
		return error(500, 'Error loading order');
	}
	// try {
	// 	return {
	// 		title: `Order ${params.id}`,
	// 		content: `This is the order ${params.id} page`
	// 	};
	// } catch (err) {
	// 	return error(500, 'Error loading order');
	// }
};
