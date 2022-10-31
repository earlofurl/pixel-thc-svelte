<script lang="ts">
	import { flexRender, type ColumnDef } from '@tanstack/svelte-table';
	import type { PackageWithNestedData } from '$lib/types/custom';
	import type { PageData } from './$types';

	import { page } from '$app/stores';
	import GeneralTable from '$lib/components/tables/GeneralTable.svelte';
	import PackageTableRowActions from '$lib/components/tables/actions/PackageTableRowActions.svelte';

	const tableColumns: ColumnDef<PackageWithNestedData>[] = [
		{
			header: 'Main',
			footer: (props) => props.column.id,
			columns: [
				{
					id: 'actions',
					header: 'Actions',
					cell: (props) => flexRender(PackageTableRowActions, { row: props.row })
				},
				{
					id: 'id',
					accessorKey: 'id',
					header: 'ID',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					enableSorting: false
				},
				{
					id: 'tag',
					accessorFn: (row: any) => (row.tag ? row.tag.tagNumber : 'No Tag'),
					cell: (info) => info.getValue(),
					header: () => 'Tag',
					footer: (props) => props.column.id,
					enableSorting: true
				},
				{
					id: 'productForm',
					accessorFn: (row: any) => `${row.item?.itemType?.productForm}`,
					cell: (info) => info.getValue(),
					header: () => 'Form',
					enableSorting: true
				},
				{
					id: 'productModifier',
					accessorFn: (row: any) => `${row.item?.itemType?.productModifier}`,
					cell: (info) => info.getValue(),
					header: () => 'Mod',
					enableSorting: true
				},
				{
					id: 'batchCode',
					accessorFn: (row: any) => `${row.labTests[0]?.labTest.batchCode}`,
					cell: (info) => info.getValue(),
					header: () => 'Batch',
					enableSorting: true
				},
				{
					id: 'strain',
					accessorFn: (row: any) => `${row.item.strain?.name}`,
					cell: (info) => info.getValue(),
					header: () => 'Strain',
					enableSorting: true
				},
				{
					id: 'type',
					accessorFn: (row: any) => `${row.item.strain?.type}`,
					cell: (info) => info.getValue(),
					header: () => 'Type',
					enableSorting: true
				}
			]
		},
		{
			header: 'Stock',
			footer: (props) => props.column.id,
			columns: [
				{
					id: 'quantity',
					accessorKey: 'quantity',
					header: () => 'Quantity',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					enableSorting: true
				},
				{
					id: 'uom',
					accessorFn: (row: any) => row.uom?.name,
					header: () => 'UoM',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					enableSorting: true
				}
			]
		},
		{
			header: 'Stats',
			footer: (props) => props.column.id,
			columns: [
				{
					id: 'thc',
					accessorFn: (row: any) => `${row.labTests[0]?.labTest.thcTotalPercent}`,
					header: () => 'THC',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id
				},
				{
					id: 'cbd',
					accessorFn: (row: any) => `${row.labTests[0]?.labTest.cbdPercent}`,
					header: () => 'CBD',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id
				},
				{
					id: 'terpenes',
					accessorFn: (row: any) => `${row.labTests[0]?.labTest.terpenePercent}`,
					header: () => 'Terps',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id
				},
				{
					id: 'totalCannabinoids',
					accessorFn: (row: any) => `${row.labTests[0]?.labTest.totalCannabinoidsPercent}`,
					header: () => 'Total Canna',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id
				}
			]
		}
	];

	export let data: PageData;
</script>

<div class="grid grid-cols-4 items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
	<div class="col-span-4 sm:flex sm:items-center mx-12">
		<div class="col-span-1 sm:flex-auto">
			<h1 class="text-xl font-semibold text-gray-900">Packages</h1>
		</div>
		<div class="col-span-1 mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<a
				href="packages/create/"
				class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
			>
				Create Package
			</a>
		</div>
	</div>
	<div class="col-span-4">
		<GeneralTable data={data.packages} columns={tableColumns} />
	</div>
</div>
