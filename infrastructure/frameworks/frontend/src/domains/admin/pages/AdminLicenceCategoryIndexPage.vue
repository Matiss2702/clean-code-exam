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
  import LicenceCategoryAddDialog from "@/domains/admin/components/LicenceCategoryAddDialog.vue";
  import LicenceCategoryDataTable from "@/domains/admin/components/LicenceCategoryDataTable.vue";
  import { getAllLicenceCategories } from "@/services/licenceCategoryService";
  import { getColumns } from "@/domains/admin/utils/licenceCategoryColumns";
  import { LicenceCategory } from "@domain/entities/LicenceCategory.ts";

  const licenceCategories = ref<LicenceCategory[]>([]);

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

  const columns = ref(getColumns());

  onMounted(() => {
    fetchLicenceCategories();
  });
</script>
