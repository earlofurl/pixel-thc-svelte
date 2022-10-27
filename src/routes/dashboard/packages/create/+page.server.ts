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
		const tagId = data.get('tagId') as string;
		const sourcePackageId = JSON.parse(data.get('parent-package-object') as string).id;
		const inheritedLabTestIds = JSON.parse(data.get('parent-package-object') as string).labTests[0]
			.labTestId;
		const itemId = JSON.parse(data.get('item-object') as string).id;
		const quantity = data.get('new-package-quantity') as string;
		const uomId = JSON.parse(data.get('uom-object') as string).id;
		const newParentQuantity = data.get('new-parent-quantity') as string;
		const notes = data.get('notes') as string;

		const bodyObject = new URLSearchParams({
			tagId,
			sourcePackageId,
			inheritedLabTestIds,
			itemId,
			quantity,
			uomId,
			newParentQuantity,
			notes
		}).toString();

		const newPackage = await fetch('http://localhost:3000/packages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: bodyObject
		});
		return { success: true };
	}
};
