import type { PageServerLoad } from './$types';
import { getAllPackages } from '$lib/server/products/api';
import { error } from '@sveltejs/kit';

export function serializeNonPOJOs<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

export const load: PageServerLoad = async ({ params }) => {
	try {
		const packages = await getAllPackages();
		return serializeNonPOJOs({ packages });
	} catch {
		throw error(401, 'Cannot find products');
	}
};
