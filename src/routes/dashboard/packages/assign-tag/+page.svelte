<script lang="ts">
	import type { PageData } from './$types';

	import ParentPackageSelect from '$lib/components/forms/ParentPackageSelect.svelte';
	import PackageTagSelect from '$lib/components/forms/PackageTagSelect.svelte';
	import { selectedParentPackage, selectedNewPackageTag } from '$lib/stores';

	export function classNames(...classes: readonly (string | undefined)[]): string | undefined {
		return classes.filter(Boolean).join(' ');
	}

	export let form;
	export let data: PageData;
</script>

<div>
	<h3 class="text-lg font-medium leading-6 text-gray-900">Assign Tag</h3>
	<p class="mt-1 max-w-2xl text-sm text-gray-500">
		Select a package and a tag to assign to the package.
	</p>
	<form method="post" class="p-4 sm:p-6 lg:p-8 space-y-8 divide-y divide-gray-200">
		<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
			<div class="space-y-6 sm:space-y-5">
				<div>
					<h3 class="text-lg font-medium leading-6 text-gray-900">Assign Tag</h3>
					<p class="mt-1 max-w-2xl text-sm text-gray-500">
						Select a package and a tag to assign to the package.
					</p>
				</div>

				<div class="grid grid-cols-3 space-y-6 sm:space-y-5">
					<!--Select Parent Package-->
					<ParentPackageSelect options={data.packages} />
					<input type="hidden" name="parent-package-id" value={$selectedParentPackage.id} />
					<!--Select Tag-->
					<PackageTagSelect options={data.packageTags} />
					<input type="hidden" name="package-tag-id" value={$selectedNewPackageTag.id} />
				</div>
			</div>
		</div>
		<div class="pt-5">
			<div class="flex justify-end">
				<button
					type="submit"
					class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Assign Tag
				</button>
			</div>
		</div>
	</form>
</div>
