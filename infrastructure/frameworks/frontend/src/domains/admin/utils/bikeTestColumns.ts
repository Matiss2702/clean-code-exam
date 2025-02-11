import { h } from "vue";
import BikeTestEditDialog from "@/domains/admin/components/BikeTestEditDialog.vue";
import BikeTestViewDialog from "@/domains/admin/components/BikeTestViewDialog.vue";
import BikeTestDeleteAlert from "@/domains/admin/components/BikeTestDeleteAlert.vue";

/**
 * Formate une date en "JJ/MM/AAAA"
 */
const formatDate = (date: string | null | undefined) => {
  if (!date) return "N/A";
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "N/A";
  return parsedDate.toLocaleDateString("fr-FR");
};

export const getColumns = () => [
  {
    accessorKey: "id",
    header: () => h("div", { class: "text-left" }, "ID"),
    cell: ({ row }: any) => {
      const id = row.getValue("id") ?? "N/A";
      return h("div", { class: "text-left font-medium" }, id);
    }
  },
  {
    accessorKey: "user_name",
    header: () => h("div", { class: "text-left" }, "Utilisateur"),
    cell: ({ row }: any) => {
      const userName = row.getValue("user_name") ?? "N/A";
      return h("div", { class: "text-left font-medium" }, userName);
    }
  },
  {
    accessorKey: "started_at",
    header: () => h("div", { class: "text-left" }, "Début"),
    cell: ({ row }: any) => {
      const startedAt = formatDate(row.getValue("started_at"));
      return h("div", { class: "text-left font-medium" }, startedAt);
    }
  },
  {
    accessorKey: "ended_at",
    header: () => h("div", { class: "text-left" }, "Fin"),
    cell: ({ row }: any) => {
      const endedAt = formatDate(row.getValue("ended_at"));
      return h("div", { class: "text-left font-medium" }, endedAt);
    }
  },
  {
    accessorKey: "bike_plate_number",
    header: () => h("div", { class: "text-left" }, "Moto"),
    cell: ({ row }: any) => {
      const bikePlate = row.getValue("bike_plate_number") ?? "N/A";
      return h("div", { class: "text-left font-medium" }, bikePlate);
    }
  },
  {
    accessorKey: "is_accepted",
    header: () => h("div", { class: "text-left" }, "Accepté"),
    cell: ({ row }: any) => {
      const isAccepted = row.getValue("is_accepted") ?? false;
      return h(
        "div",
        { class: "text-left font-medium" },
        isAccepted ? "Oui" : "Non"
      );
    }
  },
  {
    accessorKey: "price",
    header: () => h("div", { class: "text-left" }, "Prix (€)"),
    cell: ({ row }: any) => {
      let price = row.getValue("price") ?? "0.00";
      price = parseFloat(price).toFixed(2);
      return h("div", { class: "text-left font-medium" }, `€${price}`);
    }
  },
  {
    id: "actions",
    header: () => h("div", { class: "text-left font-medium" }, "Actions"),
    cell: ({ row }: any) => {
      const bikeTest = row.original;
      return h("div", { class: "flex space-x-2" }, [
        h(BikeTestViewDialog, { bikeTest }),
        h(BikeTestEditDialog, { bikeTest }),
        h(BikeTestDeleteAlert, { bikeTest })
      ]);
    }
  }
];
