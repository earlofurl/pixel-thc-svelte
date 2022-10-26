import type { PageServerLoad, Actions } from './$types';
import { BASE_URL } from '$env/static/private';

import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const packageTagResponse = await fetch(`${BASE_URL}/package-tags/false/50`);
		const packageTags = await packageTagResponse.json();

		return {
			packageTags
		};
	} catch (err) {
		return error(500, 'Error loading package tags');
	}
};

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const tagId = data.get('package-tag-id') as string;
		const packageId = data.get('parent-package-id') as string;

		const bodyObject = new URLSearchParams({
			tagId,
			packageId
		}).toString();

		const taggedPackage = await fetch('http://localhost:3000/packages/assign-tag', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: bodyObject
		});
		return { success: true };
	}
};
