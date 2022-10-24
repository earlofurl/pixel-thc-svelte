<script lang="ts">
	import type { PackageWithNestedData } from '$lib/types/custom';
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption
	} from '@rgossiaux/svelte-headlessui';
	import { selectedParentPackage } from '$lib/stores';

	export function classNames(...classes: readonly (string | undefined)[]): string | undefined {
		return classes.filter(Boolean).join(' ');
	}

	export let options: PackageWithNestedData[] = [];
</script>

<!--Parent Package Selection Listbox -->
<Listbox
	value={$selectedParentPackage}
	on:change={(e) => ($selectedParentPackage = e.detail)}
	as="div"
	class="relative items-center"
>
	<ListboxButton
		class="min-w-60 max-w-96 cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
	>
		<span class="block truncate">
			{#if $selectedParentPackage.tag}
				<div>
					<p>
						<span>{$selectedParentPackage.tag.tagNumber.slice(0, 18)}</span>{''}<span
							class="font-semibold">{$selectedParentPackage.tag.tagNumber.slice(18, 24)}</span
						>
					</p>
					<div class="w-full justify-between">
						<span>{$selectedParentPackage.item.itemType.productForm}</span> -
						<span>{$selectedParentPackage.item.itemType.productModifier}</span>
					</div>
					<div class="w-full justify-between">
						<span class="font-semibold">{$selectedParentPackage.item.strain.name}</span>
						{#if $selectedParentPackage.labTests.length > 0}
							<span>{$selectedParentPackage.labTests[0].labTest.batchCode}</span>
							<span>{$selectedParentPackage.labTests[0].labTest.thcTotalPercent}</span>
						{:else}
							<span>Untested</span>
						{/if}
					</div>
				</div>
			{:else}
				<div class="flex">
					<span class="font-semibold"> No Tag </span>
				</div>
			{/if}
		</span>
	</ListboxButton>
	<ListboxOptions
		class="absolute z-10 mt-2 w-56 min-w-20 divide-y divide-gray-100 overflow-scroll rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
	>
		{#each options as productPackage (productPackage.id)}
			<ListboxOption
				value={productPackage}
				let:selected
				let:active
				class={({ active }) =>
					active
						? 'group flex items-center w-full px-4 py-2 text-sm bg-gray-100 text-gray-800'
						: 'group flex items-center w-full px-4 py-2 text-sm text-gray-700'}
			>
				{#if productPackage.tag}
					<div>
						<p class={classNames(selected ? 'font-bold' : 'font-normal')}>
							{productPackage.tag.tagNumber}
						</p>
						<div class="w-full justify-between">
							<span>{productPackage.item.itemType.productForm}</span> -
							<span>{productPackage.item.itemType.productModifier}</span>
						</div>
						<div class="w-full justify-between">
							<span class="font-semibold">{productPackage.item.strain.name}</span>
							{#if productPackage.labTests.length > 0}
								<span>{productPackage.labTests[0].labTest.batchCode}</span>
								<span>{productPackage.labTests[0].labTest.thcTotalPercent}</span>
							{:else}
								<span>Untested</span>
							{/if}
						</div>
					</div>
				{:else}
					<div class="flex">
						<span class={classNames(selected ? 'font-semibold' : 'font-normal')}> No Tag </span>
					</div>
				{/if}
			</ListboxOption>
		{/each}
	</ListboxOptions>
</Listbox>
<!--End Parent Package Selection Listbox-->
