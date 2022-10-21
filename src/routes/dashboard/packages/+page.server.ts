import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export function serializeNonPOJOs<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

export const load: PageServerLoad = async ({ params }) => {
	try {
		const res = await fetch('http://localhost:3000/packages');
		return await res.json();
	} catch {
		throw error(401, 'Cannot find products');
	}
};
