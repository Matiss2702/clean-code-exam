import { h } from "vue";
import DriverLicenceEditDialog from "@/domains/admin/components/DriverLicenceEditDialog.vue";
import DriverLicenceViewDialog from "@/domains/admin/components/DriverLicenceViewDialog.vue";
import DriverLicenceDeleteAlert from "@/domains/admin/components/DriverLicenceDeleteAlert.vue";

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
    accessorKey: "lastName",
    header: () => h("div", { class: "text-left" }, "Nom"),
    cell: ({ row }: any) => {
      const lastName = row.getValue("lastName");
      return h("div", { class: "text-left font-medium" }, lastName);
    }
  },
  {
    accessorKey: "firstName",
    header: () => h("div", { class: "text-left" }, "Prénom"),
    cell: ({ row }: any) => {
      const firstName = row.getValue("firstName");
      return h("div", { class: "text-left font-medium" }, firstName);
    }
  },
  {
    accessorKey: "issueDate",
    header: () => h("div", { class: "text-left" }, "Délivré le"),
    cell: ({ row }: any) => {
      const issueDate = row.getValue("issueDate");
      return h(
        "div",
        { class: "text-left font-medium" },
        new Date(issueDate).toLocaleDateString("fr-FR")
      );
    }
  },
  {
    accessorKey: "expirationDate",
    header: () => h("div", { class: "text-left" }, "Expire le"),
    cell: ({ row }: any) => {
      const expirationDate = row.getValue("expirationDate");
      return h(
        "div",
        { class: "text-left font-medium" },
        new Date(expirationDate).toLocaleDateString("fr-FR")
      );
    }
  },
  {
    accessorKey: "licenceNumber",
    header: () => h("div", { class: "text-left" }, "N° Permis"),
    cell: ({ row }: any) => {
      const licenceNumber = row.getValue("licenceNumber");
      return h("div", { class: "text-left font-medium" }, licenceNumber);
    }
  },
  {
    accessorKey: "points",
    header: () => h("div", { class: "text-left" }, "Points"),
    cell: ({ row }: any) => {
      const points = row.getValue("points");
      return h("div", { class: "text-left font-medium" }, points);
    }
  },
  {
    id: "actions",
    header: () => h("div", { class: "text-left font-medium" }, "Actions"),
    cell: ({ row }: any) => {
      const driverLicence = row.original;
      return h("div", { class: "flex space-x-2" }, [
        h(DriverLicenceViewDialog, { licence: driverLicence }),
        h(DriverLicenceEditDialog, { licence: driverLicence }),
        h(DriverLicenceDeleteAlert, { licence: driverLicence })
      ]);
    }
  }
];
