<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">Modèles</h1>
      <ModelAddDialog />
    </div>
    <ModelDataTable
      :columns="columns"
      :data="models"
      :brands="brands"
      :bikeCategories="bikeCategories"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import ModelAddDialog from "@/domains/admin/components/ModelAddDialog.vue";
  import ModelDataTable from "@/domains/admin/components/ModelDataTable.vue";
  import { getAllModels } from "@/services/modelService";
  import { getAllBrands } from "@/services/brandService";
  import { getAllBikeCategories } from "@/services/bikeCategoryService";
  import { getColumns } from "@/domains/admin/utils/modelColumns";
  import { Model } from "@domain/entities/Model.ts";

  const models = ref<Model[]>([]);
  const brands = ref<{ id: string; name: string }[]>([]);
  const bikeCategories = ref<{ id: string; name: string }[]>([]);

  const fetchData = async () => {
    try {
      const [modelsData, brandsData, bikeCategoriesData] = await Promise.all([
        getAllModels(),
        getAllBrands(),
        getAllBikeCategories()
      ]);
      models.value = modelsData;
      brands.value = brandsData;
      bikeCategories.value = bikeCategoriesData;
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  const columns = ref(getColumns());

  onMounted(() => {
    fetchData();
  });
</script>
