<script lang='ts'>
	import type { PageData } from './$types';
	import ParentPackageSelect from '$lib/components/forms/ParentPackageSelect.svelte';
	import ItemSelect from '$lib/components/forms/ItemSelect.svelte';
	import UomSelect from '$lib/components/forms/UomSelect.svelte';
	import PackageTagSelect from '$lib/components/forms/PackageTagSelect.svelte';
	import { packageUnitConverter } from '$lib/utils/conversions';
	import { selectedParentPackage, selectedUom, selectedItem } from '$lib/stores';

	export let data: PageData;

	export function classNames(
		...classes: readonly (string | undefined)[]
	): (string | undefined) {
		return classes.filter(Boolean).join(' ');
	}

	let childQuantity: number;
	let parentNewQuantity: number = $selectedParentPackage?.quantity || 0;

	// calculate the remaining quantity of the parent package
	// based on the quantity taken from the child package
	// and the units of measure of each
	$: if ($selectedParentPackage.uom && $selectedUom.name) {
		parentNewQuantity = $selectedParentPackage.quantity - packageUnitConverter(
			$selectedParentPackage,
			$selectedItem,
			$selectedUom,
			childQuantity);
	}
</script>

<div class='px-4 sm:px-6 lg:px-8'>
	<div class='mt-8 flex flex-col'>
		<div class='-my-2 -mx-4 overflow-auto sm:-mx-6 lg:-mx-8'>
			<div class='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
				<div class='overflow-scroll shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
					<!--Form-->
					<form class='p-4 sm:p-6 lg:p-8 space-y-8 divide-y divide-gray-200'>
						<div class='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
							<div class='space-y-6 sm:space-y-5'>
								<div>
									<h3 class='text-lg font-medium leading-6 text-gray-900'>Create Package</h3>
									<p class='mt-1 max-w-2xl text-sm text-gray-500'>Enter information required for new package.</p>
								</div>

								<div class='flex grid grid-cols-3 space-y-6 sm:space-y-5'>
									<!--									Select Parent Package-->
									<ParentPackageSelect options={data.packages} />
									<!--									End Select Parent Package-->
									<!--Calculated displayed parent package quantity remaining-->
									<div class='block grid-span-1'>
										<label class='text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>Parent
											quantity remaining</label>
										<div class='mt-1 sm:mt-0 text-lg'>
											<span>{parentNewQuantity}</span>
											{#if $selectedParentPackage.uom}
												<span>{$selectedParentPackage.uom.abbreviation}</span>
											{:else}
												<span>--</span>
												<span>__</span>
											{/if}
										</div>
									</div>
									<!--End Calculated displayed parent package quantity remaining-->
								</div>
							</div>

							<div class='space-y-6 pt-8 sm:space-y-5 sm:pt-10'>
								<!--header-->
								<div>
									<h3 class='text-lg font-medium leading-6 text-gray-900'>New Package Data</h3>
									<p class='mt-1 max-w-2xl text-sm text-gray-500'>Enter details for what you want to create.</p>
								</div>
								<!--end header-->
								<div class='flex grid grid-cols-5 grid-rows-2 space-y-6 sm:space-y-5'>
									<!--Section Content-->
									<div class='grid-span-1 row-span-2'>
										<ItemSelect options={data.items} />
									</div>

									<!--Quantity input for new package-->
									<div class='grid-span-2 row-span-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
										<div class='row-span-2'>
											<label for='new-quantity' class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>New
												package quantity</label>
											<div class='mt-1 sm:col-span-2 sm:mt-0'>
												<input id='new-quantity' bind:value={childQuantity} name='new-quantity' type='number'
															 step='0.01'
															 class='block min-w-60 max-w-96 max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'>
											</div>
										</div>
									</div>
									<!--End quantity input for new package-->

									<div class='grid-span-1 row-span-2'>
										<UomSelect options={data.uom} />
									</div>

									<div class='grid-span-1 row-span-2'>
										<PackageTagSelect options={data.packageTags} />
									</div>
								</div>
								<!--Notes-->
								<div class='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
									<label for='notes' class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>Notes</label>
									<div class='mt-1 sm:col-span-2 sm:mt-0'>
                      <textarea id='notes' name='notes' rows='3'
																class='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'></textarea>
										<p class='mt-2 text-sm text-gray-500'>Add any notes.</p>
									</div>
								</div>
								<!--								End	Notes-->
							</div>
						</div>

						<div class='pt-5'>
							<div class='flex justify-end'>
								<button type='button'
												class='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
									Cancel
								</button>
								<button type='submit'
												class='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
									Save
								</button>
							</div>
						</div>
					</form>
					<!--End Form -->
				</div>
			</div>
		</div>
	</div>
</div>
