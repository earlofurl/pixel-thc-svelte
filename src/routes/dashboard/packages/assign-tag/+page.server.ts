import type { PageServerLoad, Actions } from './$types';
import { env } from '$env/dynamic/private';

import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const packageTagResponse = await fetch(`0.0.0.0:3420/api/v1/package-tags/false/50`);
		// const packageTagResponse = await fetch(`${env.BASE_URL}/package-tags/false/50`, {
		// 	credentials: 'include',
		// 	headers: { accept: 'application/json' }
		// });
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
