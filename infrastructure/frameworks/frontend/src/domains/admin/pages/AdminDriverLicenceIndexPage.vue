<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">Permis de conduire</h1>
      <DriverLicenceAddDialog />
    </div>
    <DriverLicenceDataTable
      :columns="columns"
      :data="driverLicences"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import DriverLicenceAddDialog from "@/domains/admin/components/DriverLicenceAddDialog.vue";
  import DriverLicenceDataTable from "@/domains/admin/components/DriverLicenceDataTable.vue";
  import { getDriverLicencesByUserId } from "@/services/driverLicenceService";
  import { getColumns } from "@/domains/admin/utils/driverLicenceColumns";
  import { DriverLicence } from "@domain/entities/DriverLicence.ts";

  const driverLicences = ref<DriverLicence[]>([]);

  const fetchDriverLicences = async () => {
    try {
      const data = await getDriverLicencesByUserId("all");
      driverLicences.value = data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des permis de conduire :",
        error
      );
    }
  };

  const columns = ref(getColumns()); // ✅ Utilisation de getColumns()

  onMounted(() => {
    fetchDriverLicences();
  });
</script>
