<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">Motos</h1>
      <BikeAddDialog />
    </div>
    <BikeDataTable
      :columns="columns"
      :data="bikes"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import BikeAddDialog from "@/domains/admin/components/BikeAddDialog.vue";
  import BikeDataTable from "@/domains/admin/components/BikeDataTable.vue";
  import { getAllBikes } from "@/services/bikeService";
  import { getColumns } from "@/domains/admin/utils/bikeColumns";
  import { Bike } from "@domain/entities/Bike.ts";

  const bikes = ref<Bike[]>([]);

  const fetchBikes = async () => {
    try {
      const data = await getAllBikes();
      bikes.value = data;
    } catch (error) {
      console.error("Erreur lors de la récupération des motos :", error);
    }
  };

  const columns = ref(getColumns());
  onMounted(() => {
    fetchBikes();
  });
</script>
