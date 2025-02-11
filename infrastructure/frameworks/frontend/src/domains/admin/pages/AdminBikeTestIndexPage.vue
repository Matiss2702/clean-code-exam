<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">Réservations de motos</h1>
      <BikeTestAddDialog />
    </div>

    <BikeTestDataTable
      v-if="bikeTests.length > 0"
      :columns="columns"
      :data="bikeTests"
    />

    <div
      v-else
      class="p-4 text-center text-gray-500"
    >
      Aucun test de moto trouvé.
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import BikeTestAddDialog from "@/domains/admin/components/BikeTestAddDialog.vue";
  import BikeTestDataTable from "@/domains/admin/components/BikeTestDataTable.vue";
  import { getAllBikeTests } from "@/services/bikeTestService";
  import { getAllBikes } from "@/services/bikeService";
  import { getAllUsers } from "@/services/userService";
  import { getColumns } from "@/domains/admin/utils/bikeTestColumns";
  import { BikeTest } from "@domain/entities/BikeTest.ts";

  const bikeTests = ref<BikeTest[]>([]);
  const bikes = ref<{ id: string; plate_number: string }[]>([]);
  const users = ref<{ id: string; name: string }[]>([]);

  const fetchBikeTests = async () => {
    try {
      const [bikeResponse, userResponse, testResponse] = await Promise.all([
        getAllBikes(),
        getAllUsers(),
        getAllBikeTests()
      ]);

      bikes.value = bikeResponse;
      users.value = userResponse;

      console.log("🚀 Données récupérées :", testResponse);

      if (Array.isArray(testResponse)) {
        bikeTests.value = testResponse.map((test) => {
          const bike = bikes.value.find((b) => b.id === test.bike_id);
          const user = users.value.find((u) => u.id === test.user_id);

          return {
            ...test,
            bike_plate_number: bike ? bike.plate_number : "N/A",
            user_name: user ? user.name : "N/A"
          };
        });
      } else {
        console.warn("❌ Données reçues non valides :", testResponse);
        bikeTests.value = [];
      }
    } catch (error) {
      console.error(
        "❌ Erreur lors de la récupération des tests de motos :",
        error
      );
      bikeTests.value = [];
    }
  };

  const columns = ref(getColumns());

  onMounted(() => {
    fetchBikeTests();
  });
</script>
