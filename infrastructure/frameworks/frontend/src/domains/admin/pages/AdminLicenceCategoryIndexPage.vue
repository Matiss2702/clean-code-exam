<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">Catégories de permis</h1>
      <!-- Dialog d'ajout d'une catégorie -->
      <LicenceCategoryAddDialog />
    </div>

    <!-- Tableau d'affichage des catégories -->
    <LicenceCategoryDataTable
      :columns="columns"
      :data="licenceCategories"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";

  // ✅ Composants spécifiques à la licence category
  import LicenceCategoryAddDialog from "@/domains/admin/components/LicenceCategoryAddDialog.vue";
  import LicenceCategoryDataTable from "@/domains/admin/components/LicenceCategoryDataTable.vue";

  // ✅ Service (adapter selon votre propre code)
  import { getAllLicenceCategories } from "@/services/licenceCategoryService";

  // ✅ Colonnes (adapter selon votre structure)
  import { getColumns } from "@/domains/admin/utils/licenceCategoryColumns";

  // ✅ Entité LicenceCategory
  import { LicenceCategory } from "@domain/entities/LicenceCategory.ts";

  // Tableau local des catégories récupérées
  const licenceCategories = ref<LicenceCategory[]>([]);

  // Fonction pour récupérer les catégories depuis l'API
  const fetchLicenceCategories = async () => {
    try {
      const data = await getAllLicenceCategories();
      licenceCategories.value = data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des catégories de permis :",
        error
      );
    }
  };

  // Récupération des définitions de colonnes
  const columns = ref(getColumns());

  // Au montage du composant, on lance la récupération
  onMounted(() => {
    fetchLicenceCategories();
  });
</script>
