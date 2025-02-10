import { h } from "vue";

// ✅ Composants pour la vue, l'édition, et la suppression
import LicenceCategoryViewDialog from "@/domains/admin/components/LicenceCategoryViewDialog.vue";
import LicenceCategoryEditDialog from "@/domains/admin/components/LicenceCategoryEditDialog.vue";
import LicenceCategoryDeleteAlert from "@/domains/admin/components/LicenceCategoryDeleteAlert.vue";

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
    accessorKey: "transmission_type",
    header: () => h("div", { class: "text-left" }, "Transmission"),
    cell: ({ row }: any) => {
      const transmission = row.getValue("transmission_type");
      return h(
        "div",
        { class: "text-left font-medium capitalize" },
        transmission
      );
    }
  },
  {
    id: "actions",
    header: () => h("div", { class: "text-left font-medium" }, "Actions"),
    cell: ({ row }: any) => {
      // l'objet licenceCategory complet
      const licenceCategory = row.original;

      // On crée un container avec les 3 actions
      return h("div", { class: "flex space-x-2" }, [
        // Bouton pour afficher la vue de la catégorie
        h(LicenceCategoryViewDialog, {
          category: licenceCategory
        }),
        // Bouton pour éditer la catégorie
        h(LicenceCategoryEditDialog, {
          category: licenceCategory
        }),
        // Bouton pour supprimer la catégorie
        h(LicenceCategoryDeleteAlert, {
          category: licenceCategory
        })
      ]);
    }
  }
];
