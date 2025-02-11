import { h } from "vue";
import BikeEditDialog from "@/domains/admin/components/BikeEditDialog.vue";
import BikeViewDialog from "@/domains/admin/components/BikeViewDialog.vue";
import BikeDeleteAlert from "@/domains/admin/components/BikeDeleteAlert.vue";

const formatDate = (date: string) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

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
    accessorKey: "serial_number",
    header: () => h("div", { class: "text-left" }, "Numéro de série"),
    cell: ({ row }: any) => {
      const serialNumber = row.getValue("serial_number");
      return h("div", { class: "text-left font-medium" }, serialNumber);
    }
  },
  {
    accessorKey: "purchase_date",
    header: () => h("div", { class: "text-left" }, "Date d'achat"),
    cell: ({ row }: any) => {
      const purchaseDate = row.getValue("purchase_date");
      const formattedDate = formatDate(purchaseDate);
      return h("div", { class: "text-left font-medium" }, formattedDate);
    }
  },
  {
    accessorKey: "mileage",
    header: () => h("div", { class: "text-left" }, "Kilométrage"),
    cell: ({ row }: any) => {
      const mileage = row.getValue("mileage");
      return h("div", { class: "text-left font-medium" }, mileage);
    }
  },
  {
    accessorKey: "plate_number",
    header: () => h("div", { class: "text-left" }, "Plaque d'immatriculation"),
    cell: ({ row }: any) => {
      const plateNumber = row.getValue("plate_number");
      return h("div", { class: "text-left font-medium" }, plateNumber);
    }
  },
  {
    id: "actions",
    header: () => h("div", { class: "text-left font-medium" }, "Actions"),
    cell: ({ row }: any) => {
      const bike = row.original;
      return h("div", { class: "flex space-x-2" }, [
        h(BikeViewDialog, {
          bike: bike
        }),
        h(BikeEditDialog, {
          bike: bike
        }),
        h(BikeDeleteAlert, {
          bike: bike
        })
      ]);
    }
  }
];
