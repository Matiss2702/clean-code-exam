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
        <template v-if="table.getRowModel().rows.length > 0">
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
              Aucun test de moto trouvé.
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

  import type { BikeTest } from "@domain/entities/BikeTest.ts";

  const props = defineProps<{
    columns: ColumnDef<BikeTest>[];
    data: BikeTest[];
  }>();

  const table = useVueTable({
    get data() {
      return Array.isArray(props.data) ? props.data : [];
    },
    get columns() {
      return Array.isArray(props.columns) ? props.columns : [];
    },
    getCoreRowModel: getCoreRowModel()
  });
</script>
