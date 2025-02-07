import { h } from "vue";
import BrandEditDialog from "@/domains/admin/components/BrandEditDialog.vue";
import BrandViewDialog from "@/domains/admin/components/BrandViewDialog.vue";
import BrandDeleteAlert from "@/domains/admin/components/BrandDeleteAlert.vue";
export const getColumns = () => [
  {
    accessorKey: "id",
    header: () => h("div", { class: "text-left" }, "ID"),
    cell: ({ row }: any) => {
      const id = row.getValue("id");
      return h("div", { class: "text-left font-medium" }, id);
    }
  },
  {
    accessorKey: "name",
    header: () => h("div", { class: "text-left" }, "Name"),
    cell: ({ row }: any) => {
      const name = row.getValue("name");
      return h("div", { class: "text-left font-medium" }, name);
    }
  },
  {
    id: "actions",
    header: () => h("div", { class: "text-left font-medium" }, "Actions"),
    cell: ({ row }: any) => {
      const brand = row.original;
      return h("div", { class: "flex space-x-2" }, [
        h(BrandViewDialog, {
          brand: brand
        }),
        h(BrandEditDialog, {
          brand: brand
        }),
        h(BrandDeleteAlert, {
          brand: brand
        })
      ]);
    }
  }
];
