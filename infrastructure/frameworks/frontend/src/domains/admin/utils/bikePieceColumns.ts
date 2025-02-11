import { h } from "vue";
import BikePieceEditDialog from "@/domains/admin/components/BikePieceEditDialog.vue";
import BikePieceViewDialog from "@/domains/admin/components/BikePieceViewDialog.vue";
import BikePieceDeleteAlert from "@/domains/admin/components/BikePieceDeleteAlert.vue";

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
    header: () => h("div", { class: "text-left" }, "Nom de la pièce"),
    cell: ({ row }: any) => {
      const name = row.getValue("name");
      return h("div", { class: "text-left font-medium" }, name);
    }
  },
  {
    accessorKey: "reference",
    header: () => h("div", { class: "text-left" }, "Référence"),
    cell: ({ row }: any) => {
      const reference = row.getValue("reference");
      return h("div", { class: "text-left font-medium" }, reference);
    }
  },
  {
    accessorKey: "price",
    header: () => h("div", { class: "text-left" }, "Prix"),
    cell: ({ row }: any) => {
      let price = row.getValue("price");
  
      if (typeof price === 'string') {
        price = parseFloat(price);
      }
  
      const formattedPrice = !isNaN(price) && price !== null ? price.toFixed(2) : "N/A";
  
      return h("div", { class: "text-left font-medium" }, formattedPrice);
    }
  },
  {
    accessorKey: "stock",
    header: () => h("div", { class: "text-left" }, "Stock"),
    cell: ({ row }: any) => {
      const stock = row.getValue("stock");
      return h("div", { class: "text-left font-medium" }, stock);
    }
  },
  {
    accessorKey: "stock_alert",
    header: () => h("div", { class: "text-left" }, "Alerte de stock"),
    cell: ({ row }: any) => {
      const stockAlert = row.getValue("stock_alert");
      return h("div", { class: "text-left font-medium" }, stockAlert);
    }
  },
  {
    accessorKey: "maintenance_period_alert",
    header: () => h("div", { class: "text-left" }, "Période d'entretien (Km)"),
    cell: ({ row }: any) => {
      const maintenanceAlert = row.getValue("maintenance_period_alert");
      return h("div", { class: "text-left font-medium" }, maintenanceAlert);
    }
  },
  {
    id: "actions",
    header: () => h("div", { class: "text-left font-medium" }, "Actions"),
    cell: ({ row }: any) => {
      const bikePiece = row.original;
      return h("div", { class: "flex space-x-2" }, [
        h(BikePieceViewDialog, {
          bikePiece: bikePiece
        }),
        h(BikePieceEditDialog, {
          bikePiece: bikePiece
        }),
        h(BikePieceDeleteAlert, {
          bikePiece: bikePiece
        })
      ]);
    }
  }
];
