<template>
  <div class="w-full max-w-3xl p-4 pt-8 mx-auto">
    <h1 class="mb-6 text-2xl font-bold">Mes Essais de Moto</h1>

    <!-- Chargement en cours -->
    <div
      v-if="loading"
      class="p-4 text-center"
    >
      Chargement...
    </div>

    <!-- Affichage des essais -->
    <div v-else>
      <div v-if="bikeTests.length > 0">
        <table class="w-full border border-collapse border-gray-300">
          <thead>
            <tr class="bg-gray-200">
              <th class="p-2 border border-gray-300">Moto</th>
              <th class="p-2 border border-gray-300">Début</th>
              <th class="p-2 border border-gray-300">Fin</th>
              <th class="p-2 border border-gray-300">Jours</th>
              <th class="p-2 border border-gray-300">Prix (€)</th>
              <th class="p-2 border border-gray-300">Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="bikeTest in bikeTests"
              :key="bikeTest.id"
              class="border border-gray-300"
            >
              <td class="p-2 text-center border border-gray-300">
                {{ bikeTest.bikeName || "Nom inconnu" }}
              </td>
              <td class="p-2 text-center border border-gray-300">
                {{ formatDate(bikeTest.started_at) }}
              </td>
              <td class="p-2 text-center border border-gray-300">
                {{ formatDate(bikeTest.ended_at) }}
              </td>
              <td class="p-2 text-center border border-gray-300">
                {{ calculateDays(bikeTest.started_at, bikeTest.ended_at) }}
              </td>
              <td class="p-2 text-center border border-gray-300">
                {{ bikeTest.price }}€
              </td>
              <td class="p-2 text-center border border-gray-300">
                {{ bikeTest.is_accepted ? "Accepté" : "En attente" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>Aucun essai de moto trouvé.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from "vue";
  import { getBikeTestsByUserId } from "@/services/bikeTestService";
  import { getBikeById } from "@/services/bikeService";
  import { useAuthStore } from "@/stores/authStore";

  const bikeTests = ref<any[]>([]);
  const loading = ref(true);

  const authStore = useAuthStore();
  const userId = computed(() => {
    if (authStore.user?.id) {
      return authStore.user.id;
    } else if (authStore.token) {
      try {
        const parts = authStore.token.split(".");
        const payloadBase64 = parts[1];
        const padded = payloadBase64.padEnd(
          payloadBase64.length + ((4 - (payloadBase64.length % 4)) % 4),
          "="
        );
        const payload = JSON.parse(atob(padded));
        return payload?.userId || "";
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        return "";
      }
    }
    return "";
  });

  onMounted(async () => {
    try {
      if (userId.value) {
        const data = await getBikeTestsByUserId(userId.value);

        for (const bikeTest of data) {
          const bikeData = await getBikeById(bikeTest.bike_id);
          bikeTest.bikeName = bikeData?.plate_number || "Nom inconnu";
        }

        bikeTests.value = data;
      }
    } catch (error) {
      console.error(
        "🚨 Erreur lors de la récupération des essais de moto :",
        error
      );
    } finally {
      loading.value = false;
    }
  });

  const formatDate = (isoDate: string) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return date.toLocaleDateString("fr-FR");
  };

  const calculateDays = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return "N/A";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
</script>
