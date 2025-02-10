import { h } from "vue";
import ModelEditDialog from "@/domains/admin/components/ModelEditDialog.vue";
import ModelViewDialog from "@/domains/admin/components/ModelViewDialog.vue";
import ModelDeleteAlert from "@/domains/admin/components/ModelDeleteAlert.vue";

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
    header: () => h("div", { class: "text-left" }, "Nom"),
    cell: ({ row }: any) => {
      const name = row.getValue("name");
      return h("div", { class: "text-left font-medium" }, name);
    }
  },
  {
    accessorKey: "maintenance_mileage_alert",
    header: () => h("div", { class: "text-left" }, "Alerte (Km)"),
    cell: ({ row }: any) => {
      const maintenanceMileageAlert = row.getValue("maintenance_mileage_alert");
      return h("div", { class: "text-left" }, maintenanceMileageAlert);
    }
  },
  {
    accessorKey: "maintenance_period_alert",
    header: () => h("div", { class: "text-left" }, "Alerte (Mois)"),
    cell: ({ row }: any) => {
      const maintenancePeriodAlert = row.getValue("maintenance_period_alert");
      return h("div", { class: "text-left" }, maintenancePeriodAlert);
    }
  },
  {
    accessorKey: "top_case",
    header: () => h("div", { class: "text-left" }, "Top Case"),
    cell: ({ row }: any) => {
      const topCase = row.getValue("top_case");
      return h("div", { class: "text-left" }, topCase);
    }
  },
  {
    accessorKey: "seat",
    header: () => h("div", { class: "text-left" }, "Siège"),
    cell: ({ row }: any) => {
      const seat = row.getValue("seat");
      return h("div", { class: "text-left" }, seat);
    }
  },
  {
    accessorKey: "transmission_type",
    header: () => h("div", { class: "text-left" }, "Transmission"),
    cell: ({ row }: any) => {
      const transmissionType = row.getValue("transmission_type");
      return h("div", { class: "text-left" }, transmissionType);
    }
  },
  {
    id: "actions",
    header: () => h("div", { class: "text-left font-medium" }, "Actions"),
    cell: ({ row }: any) => {
      const model = row.original;
      return h("div", { class: "flex space-x-2" }, [
        h(ModelViewDialog, { model: model }),
        h(ModelEditDialog, { model: model }),
        h(ModelDeleteAlert, { model: model })
      ]);
    }
  }
];
