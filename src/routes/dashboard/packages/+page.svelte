<script lang="ts">
  import type { ColumnDef } from "@tanstack/svelte-table";
  import type { PackageWithNestedData } from "$lib/types/custom";

  import GeneralTable from "$lib/components/tables/GeneralTable.svelte";

  const tableColumns: ColumnDef<PackageWithNestedData>[] = [
    {
      header: "Main",
      footer: props => props.column.id,
      columns: [
        {
          id: "id",
          accessorKey: "id",
          header: "ID",
          cell: info => info.getValue(),
          footer: props => props.column.id
        },
        {
          id: "tag",
          accessorFn: (row: any) => (row.tag ? row.tag.tagNumber : "No Tag"),
          cell: info => info.getValue(),
          header: () => "Tag",
          footer: props => props.column.id
        },
        {
          id: "productForm",
          accessorFn: (row: any) => `${row.item.itemType?.productForm}`,
          cell: info => info.getValue(),
          header: () => "Form"
        },
        {
          id: "productModifier",
          accessorFn: (row: any) => `${row.item.itemType?.productModifier}`,
          cell: info => info.getValue(),
          header: () => "Mod"
        },
        {
          id: "batchCode",
          accessorFn: (row: any) => `${row.labTests[0]?.labTest.batchCode}`,
          cell: info => info.getValue(),
          header: () => "Batch"
        },
        {
          id: "strain",
          accessorFn: (row: any) => `${row.item.strain?.name}`,
          cell: info => info.getValue(),
          header: () => "Strain"
        },
        {
          id: "type",
          accessorFn: (row: any) => `${row.item.strain?.type}`,
          cell: info => info.getValue(),
          header: () => "Type"
        }
      ]
    },
    {
      header: "Stock",
      footer: props => props.column.id,
      columns: [
        {
          id: "quantity",
          accessorKey: "quantity",
          header: () => "Quantity",
          cell: info => info.getValue(),
          footer: props => props.column.id
        },
        {
          id: "uom",
          accessorFn: (row: any) => row.uom?.name,
          header: () => "UoM",
          cell: info => info.getValue(),
          footer: props => props.column.id
        }
      ]
    },
    {
      header: "Stats",
      footer: props => props.column.id,
      columns: [
        {
          id: "thc",
          accessorFn: (row: any) => `${row.labTests[0]?.labTest.thcTotalPercent}`,
          header: () => "THC",
          cell: info => info.getValue(),
          footer: props => props.column.id
        },
        {
          id: "cbd",
          accessorFn: (row: any) => `${row.labTests[0]?.labTest.cbdPercent}`,
          header: () => "CBD",
          cell: info => info.getValue(),
          footer: props => props.column.id
        },
        {
          id: "terpenes",
          accessorFn: (row: any) => `${row.labTests[0]?.labTest.terpenePercent}`,
          header: () => "Terps",
          cell: info => info.getValue(),
          footer: props => props.column.id
        },
        {
          id: "totalCannabinoids",
          accessorFn: (row: any) => `${row.labTests[0]?.labTest.totalCannabinoidsPercent}`,
          header: () => "Total Canna",
          cell: info => info.getValue(),
          footer: props => props.column.id
        }
      ]
    }
  ];

  /** @type {import("./$types").PageData} */
  export let data;
</script>

<h1 class="font-bold text-2xl text-gray-900">Inventory</h1>

<GeneralTable data={data.packages} columns={tableColumns} />
