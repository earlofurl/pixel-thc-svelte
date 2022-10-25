<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import ParentPackageSelect from '$lib/components/forms/ParentPackageSelect.svelte';
	import ItemSelect from '$lib/components/forms/ItemSelect.svelte';
	import UomSelect from '$lib/components/forms/UomSelect.svelte';
	import PackageTagSelect from '$lib/components/forms/PackageTagSelect.svelte';
	import { packageUnitConverter } from '$lib/utils/conversions';
	import {
		selectedParentPackage,
		selectedUom,
		selectedItem,
		selectedNewPackageTag
	} from '$lib/stores';

	export let form;
	export let data: PageData;

	export function classNames(...classes: readonly (string | undefined)[]): string | undefined {
		return classes.filter(Boolean).join(' ');
	}

	let childQuantity: number;
	let parentNewQuantity: number = $selectedParentPackage?.quantity || 0;

	// calculate the remaining quantity of the parent package
	// based on the quantity taken from the child package
	// and the units of measure of each
	$: if ($selectedParentPackage && $selectedUom.name) {
		parentNewQuantity =
			$selectedParentPackage.quantity -
			packageUnitConverter($selectedParentPackage, $selectedItem, $selectedUom, childQuantity);
	}
</script>

<div class="px-4 sm:px-6 lg:px-8">
	<div class="mt-8 flex flex-col">
		<div class="-my-2 -mx-4 overflow-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div class="overflow-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
					<!-- Form -->
					<form method="post" class="space-y-8 divide-y divide-gray-200">
						<div class="space-y-8 divide-y divide-gray-200">
							<div class="p-8">
								<div>
									<h3 class="text-lg font-medium leading-6 text-gray-900">Create Package</h3>
									<p class="mt-1 text-sm text-gray-500">
										Enter information required for new package.
									</p>
								</div>

								<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
									<div class="sm:col-span-4">
										<label for="parent-package" class="block text-sm font-medium text-gray-700"
											>Parent Package</label
										>
										<div class="mt-1 flex rounded-md shadow-sm">
											<ParentPackageSelect options={data.packages} />
											<input
												id="parent-package"
												type="hidden"
												name="parent-package-object"
												value={JSON.stringify($selectedParentPackage)}
											/>
										</div>
									</div>

									<div class="sm:col-span-6">
										<p class="block text-sm font-medium text-gray-700">Parent Quantity Remaining</p>
										<div class="mt-1 text-lg">
											<span>{parentNewQuantity ? parentNewQuantity : '0'}</span>
											{#if $selectedParentPackage.uom}
												<span>{$selectedParentPackage.uom.abbreviation}</span>
											{:else}
												<span>--</span>
												<span>__</span>
											{/if}
										</div>
									</div>

									<div class="sm:col-span-6">
										<label for="item-select" class="block text-sm font-medium text-gray-700"
											>Select new package item.</label
										>
										<div class="mt-1 flex items-center">
											<ItemSelect options={data.items} />
											<input
												id="item-select"
												type="hidden"
												name="item-object"
												value={JSON.stringify($selectedItem)}
											/>
										</div>
									</div>

									<div class="mt-1 sm:col-span-2 sm:mt-0">
										<div>
											<label
												for="new-package-quantity"
												class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
												>New package quantity</label
											>
											<div class="mt-1 sm:col-span-2 sm:mt-0">
												<input
													id="new-package-quantity"
													bind:value={childQuantity}
													name="new-package-quantity"
													type="number"
													step="0.01"
													class="block min-w-60 max-w-96 max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
												/>
											</div>
										</div>
									</div>
									<div class="sm:col-span-6">
										<label for="uom-select" class="block text-sm font-medium text-gray-700"
											>Select UoM</label
										>
										<UomSelect options={data.uom} />
										<input
											id="uom-select"
											type="hidden"
											name="uom-object"
											value={JSON.stringify($selectedUom)}
										/>
									</div>
									<div class="sm:col-span-4">
										<label for="tag-select" class="block text-sm font-medium text-gray-700"
											>Select new Tag</label
										>
										<PackageTagSelect options={data.packageTags} />
										<input
											id="tag-select"
											type="hidden"
											name="tagId"
											value={$selectedNewPackageTag.id}
										/>
									</div>
								</div>
							</div>
						</div>

						<input type="hidden" name="new-parent-quantity" value={parentNewQuantity} />

						<div class="pt-5">
							<div class="flex justify-end">
								<button
									type="button"
									class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									>Cancel</button
								>
								<button
									type="submit"
									class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									>Save</button
								>
							</div>
						</div>
					</form>
					<!-- End Form -->
				</div>
			</div>
		</div>
	</div>
</div>
