import type { PageServerLoad, Actions } from './$types';
import { env } from '$env/dynamic/private';

import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	const getHeaders = new Headers({
		'Content-Type': 'application/json'
	});

	const getPackagesRequest = new Request(`${env.API_BASE_URL}/api/v1/package-tags/false/50`, {
		method: 'GET',
		mode: 'no-cors',
		referrerPolicy: 'strict-origin-when-cross-origin',
		headers: getHeaders
	});

	try {
		// const packageTagResponse = await fetch(`0.0.0.0:3420/api/v1/package-tags/false/50`);
		const packageTagResponse = await fetch(getPackagesRequest);
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

		const taggedPackage = await fetch(`${env.API_BASE_URL}/api/v1/packages/assign-tag`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: bodyObject
		});
		return { success: true };
	}
};
