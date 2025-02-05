<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">Marques</h1>
      <BrandAddDialog />
    </div>
    <BrandDataTable
      :columns="columns"
      :data="brands"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import BrandAddDialog from "@/domains/admin/components/BrandAddDialog.vue";
  import BrandDataTable from "@/domains/admin/components/BrandDataTable.vue";
  import { getAllBrands } from "@/services/brandService";
  import { getColumns } from "@/domains/admin/utils/brandColumns";
  import { Brand } from "@/domain/entities/Brand.ts";

  const brands = ref<Brand[]>([]);

  const fetchBrands = async () => {
    try {
      const data = await getAllBrands();
      brands.value = data;
    } catch (error) {
      console.error("Erreur lors de la récupération des marques :", error);
    }
  };

  const columns = ref(getColumns());

  onMounted(() => {
    fetchBrands();
  });
</script>
