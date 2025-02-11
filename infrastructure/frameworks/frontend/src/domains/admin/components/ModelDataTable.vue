<template>
  <div class="border">
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
        </template>

        <template v-else>
          <TableRow>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center"
            >
              Aucun résultat trouvé.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
  import type { ColumnDef } from "@tanstack/vue-table";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from "@/components/ui/table";

  import {
    FlexRender,
    getCoreRowModel,
    useVueTable
  } from "@tanstack/vue-table";

  const props = defineProps<{
    columns: ColumnDef<Model>[];
    data: Model[];
    brands: { id: string; name: string }[];
    bikeCategories: { id: string; name: string }[];
  }>();

  const table = useVueTable({
    get data() {
      return props.data;
    },
    get columns() {
      return props.columns;
    },
    getCoreRowModel: getCoreRowModel()
  });

  const getBrandName = (brandId: string) => {
    const brand = props.brands.find((b) => b.id === brandId);
    console.log("brand", brand);
    return brand ? brand.name : "Unknown Brand";
  };

  const getCategoryName = (categoryId: string) => {
    const category = props.bikeCategories.find((c) => c.id === categoryId);
    console.log("category", category);
    return category ? category.name : "Unknown Category";
  };

  const updatedColumns = props.columns.map((col) => {
    if ((col as any).accessorKey === "brand_id") {
      return {
        ...col,
        cell: ({ row }: any) => {
          const brandId = row.getValue("brand_id");
          return h("div", { class: "text-left" }, getBrandName(brandId));
        }
      };
    }

    if ((col as any).accessorKey === "bike_category_id") {
      return {
        ...col,
        cell: ({ row }: any) => {
          const categoryId = row.getValue("bike_category_id");
          return h("div", { class: "text-left" }, getCategoryName(categoryId));
        }
      };
    }

    return col;
  });
</script>
