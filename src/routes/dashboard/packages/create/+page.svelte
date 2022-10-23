<script lang='ts'>
	import type { PageData } from './$types';
	import PackageSelect from '$lib/components/forms/ParentPackageSelect.svelte';
	import ItemSelect from '$lib/components/forms/ItemSelect.svelte';
	import { selectedParentPackage } from '$lib/stores';

	export let data: PageData;

	export function classNames(
		...classes: readonly (string | undefined)[]
	): (string | undefined) {
		return classes.filter(Boolean).join(' ');
	}
</script>

<div class='px-4 sm:px-6 lg:px-8'>
	<div class='mt-8 flex flex-col'>
		<div class='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
			<div class='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
				<div class='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
					<!--Form-->
					<form class='p-4 sm:p-6 lg:p-8 space-y-8 divide-y divide-gray-200'>
						<div class='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
							<div class='space-y-6 sm:space-y-5'>
								<div>
									<h3 class='text-lg font-medium leading-6 text-gray-900'>Create Package</h3>
									<p class='mt-1 max-w-2xl text-sm text-gray-500'>Enter information required for new package.</p>
								</div>

								<div class='space-y-6 sm:space-y-5'>
									<!--									Select Parent Package-->
									<PackageSelect options={data.packages} />
									<!--									End Select Parent Package-->
								</div>

								<div class='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
									<label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>Parent
										quantity</label>
									<div class='mt-1 sm:col-span-2 sm:mt-0'>
										{#if $selectedParentPackage.uom}
										<span>
											{$selectedParentPackage.quantity}
										</span>
											<span>
											{$selectedParentPackage.uom.abbreviation}
										</span>
										{:else}
											<span>--</span>
											<span>__</span>
										{/if}
									</div>
								</div>
								<div class='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>

								</div>

							</div>

							<div class='space-y-6 pt-8 sm:space-y-5 sm:pt-10'>
								<div>
									<h3 class='text-lg font-medium leading-6 text-gray-900'>New Package Data</h3>
									<p class='mt-1 max-w-2xl text-sm text-gray-500'>Enter details for what you want to create.</p>
								</div>
								<div class='space-y-6 sm:space-y-5'>
									<!--Section Content-->

									<ItemSelect options={data.items} />

									<div class='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
										<label for='new-quantity' class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>New
											package quantity</label>
										<div class='mt-1 sm:col-span-2 sm:mt-0'>
											<input id='new-quantity' name='new-quantity' type='number'
														 class='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'>
										</div>
									</div>



									<div class='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
										<label for='country'
													 class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>Country</label>
										<div class='mt-1 sm:col-span-2 sm:mt-0'>
											<select id='country' name='country' autocomplete='country-name'
															class='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'>
												<option>United States</option>
												<option>Canada</option>
												<option>Mexico</option>
											</select>
										</div>
									</div>

									<div class='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
										<label for='street-address' class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>Street
											address</label>
										<div class='mt-1 sm:col-span-2 sm:mt-0'>
											<input type='text' name='street-address' id='street-address' autocomplete='street-address'
														 class='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'>
										</div>
									</div>

									<div class='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
										<label for='city' class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>City</label>
										<div class='mt-1 sm:col-span-2 sm:mt-0'>
											<input type='text' name='city' id='city' autocomplete='address-level2'
														 class='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'>
										</div>
									</div>

									<div class='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
										<label for='region' class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>State /
											Province</label>
										<div class='mt-1 sm:col-span-2 sm:mt-0'>
											<input type='text' name='region' id='region' autocomplete='address-level1'
														 class='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'>
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

							<div class='space-y-6 divide-y divide-gray-200 pt-8 sm:space-y-5 sm:pt-10'>
								<div>
									<h3 class='text-lg font-medium leading-6 text-gray-900'>Notifications</h3>
									<p class='mt-1 max-w-2xl text-sm text-gray-500'>We'll always let you know about important changes, but
										you pick what else you want to hear about.</p>
								</div>
								<div class='space-y-6 divide-y divide-gray-200 sm:space-y-5'>
									<div class='pt-6 sm:pt-5'>
										<div role='group' aria-labelledby='label-email'>
											<div class='sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4'>
												<div>
													<div class='text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700' id='label-email'>
														By Email
													</div>
												</div>
												<div class='mt-4 sm:col-span-2 sm:mt-0'>
													<div class='max-w-lg space-y-4'>
														<div class='relative flex items-start'>
															<div class='flex h-5 items-center'>
																<input id='comments' name='comments' type='checkbox'
																			 class='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'>
															</div>
															<div class='ml-3 text-sm'>
																<label for='comments' class='font-medium text-gray-700'>Comments</label>
																<p class='text-gray-500'>Get notified when someones posts a comment on a posting.</p>
															</div>
														</div>
														<div class='relative flex items-start'>
															<div class='flex h-5 items-center'>
																<input id='candidates' name='candidates' type='checkbox'
																			 class='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'>
															</div>
															<div class='ml-3 text-sm'>
																<label for='candidates' class='font-medium text-gray-700'>Candidates</label>
																<p class='text-gray-500'>Get notified when a candidate applies for a job.</p>
															</div>
														</div>
														<div class='relative flex items-start'>
															<div class='flex h-5 items-center'>
																<input id='offers' name='offers' type='checkbox'
																			 class='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'>
															</div>
															<div class='ml-3 text-sm'>
																<label for='offers' class='font-medium text-gray-700'>Offers</label>
																<p class='text-gray-500'>Get notified when a candidate accepts or rejects an offer.</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class='pt-6 sm:pt-5'>
										<div role='group' aria-labelledby='label-notifications'>
											<div class='sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4'>
												<div>
													<div class='text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700'
															 id='label-notifications'>Push Notifications
													</div>
												</div>
												<div class='sm:col-span-2'>
													<div class='max-w-lg'>
														<p class='text-sm text-gray-500'>These are delivered via SMS to your mobile phone.</p>
														<div class='mt-4 space-y-4'>
															<div class='flex items-center'>
																<input id='push-everything' name='push-notifications' type='radio'
																			 class='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'>
																<label for='push-everything' class='ml-3 block text-sm font-medium text-gray-700'>Everything</label>
															</div>
															<div class='flex items-center'>
																<input id='push-email' name='push-notifications' type='radio'
																			 class='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'>
																<label for='push-email' class='ml-3 block text-sm font-medium text-gray-700'>Same as
																	email</label>
															</div>
															<div class='flex items-center'>
																<input id='push-nothing' name='push-notifications' type='radio'
																			 class='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'>
																<label for='push-nothing' class='ml-3 block text-sm font-medium text-gray-700'>No push
																	notifications</label>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
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
