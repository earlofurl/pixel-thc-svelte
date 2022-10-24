<script lang="ts">
	import type { PackageTag } from '$lib/types/prisma-model-types';
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption
	} from '@rgossiaux/svelte-headlessui';
	import { selectedNewPackageTag } from '$lib/stores';

	export function classNames(...classes: readonly (string | undefined)[]): string | undefined {
		return classes.filter(Boolean).join(' ');
	}

	export let options: PackageTag[] = [];
</script>

<!--Package Tag Selection Listbox -->
<Listbox
	value={$selectedNewPackageTag}
	on:change={(e) => ($selectedNewPackageTag = e.detail)}
	as="div"
	class="relative items-center"
>
	<ListboxButton
		class="relative min-w-60 max-w-96 cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
	>
		<div>
			<p class="font-semibold">
				{$selectedNewPackageTag.tagNumber}
			</p>
		</div>
	</ListboxButton>
	<ListboxOptions
		class="absolute z-20 mt-2 w-56 origin-top-left divide-y divide-gray-100 overflow-visible rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
	>
		{#each options as packageTag (packageTag.id)}
			<ListboxOption
				value={packageTag}
				let:selected
				let:active
				class={({ active }) =>
					active
						? 'group flex items-center w-full px-4 py-2 text-sm bg-gray-100 text-gray-800'
						: 'group flex items-center w-full px-4 py-2 text-sm text-gray-700'}
			>
				<div>
					<p class={classNames(selected ? 'font-bold' : 'font-normal')}>
						{packageTag.tagNumber}
					</p>
				</div>
			</ListboxOption>
		{/each}
	</ListboxOptions>
</Listbox>
<!--End Package Tag Selection Listbox-->
