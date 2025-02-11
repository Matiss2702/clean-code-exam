<template>
  <div class="w-full max-w-2xl p-4 pt-8 mx-auto">
    <h1 class="mb-6 text-2xl font-bold">Créer un Test de Moto</h1>

    <div
      v-if="loading"
      class="p-4 text-center"
    >
      Chargement...
    </div>

    <form
      v-else
      @submit.prevent="onSubmit"
      class="grid grid-cols-1 gap-4"
    >
      <!-- Sélection de la Moto -->
      <div class="flex flex-col">
        <label
          for="bike"
          class="mb-2 font-medium"
        >
          Moto
        </label>
        <select
          id="bike"
          v-model="bikeId"
          class="p-2 border rounded"
          required
        >
          <option
            value=""
            disabled
          >
            Sélectionner une moto
          </option>
          <option
            v-for="bike in bikes"
            :key="bike.id"
            :value="bike.id"
          >
            {{ bike.plate_number }} - {{ bike.price }}€
            <!-- Affichez le numéro de plaque et le prix -->
          </option>
        </select>
      </div>

      <!-- Date de Début du Test -->
      <div class="flex flex-col">
        <label
          for="started_at"
          class="mb-2 font-medium"
        >
          Date de début
        </label>
        <input
          id="started_at"
          v-model="startedAt"
          type="date"
          class="p-2 border rounded"
          required
        />
      </div>

      <!-- Nombre de jours -->
      <div class="flex flex-col">
        <label
          for="days"
          class="mb-2 font-medium"
        >
          Nombre de jours
        </label>
        <input
          id="days"
          v-model="days"
          type="number"
          min="1"
          class="p-2 border rounded"
          @input="updatePrice"
          required
        />
      </div>

      <!-- Prix du Test (non modifiable) -->
      <div class="flex flex-col">
        <label
          for="price"
          class="mb-2 font-medium"
        >
          Prix Total
        </label>
        <input
          id="price"
          v-model="price"
          type="number"
          class="p-2 bg-gray-100 border rounded"
          readonly
        />
      </div>

      <!-- Bouton de soumission -->
      <button
        type="submit"
        class="p-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Créer le Test
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from "vue";
  import { createBikeTest } from "@/services/bikeTestService";
  import { getAllBikes } from "@/services/bikeService";
  import { useAuthStore } from "@/stores/authStore";

  // Références pour les champs du formulaire
  const bikeId = ref("");
  const startedAt = ref("");
  const days = ref(1);
  const price = ref(0);
  const bikes = ref<{ id: string; plate_number: string; price: string }[]>([]);
  const loading = ref(true);

  // Récupération de l'ID de l'utilisateur connecté
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

  // Chargement des motos disponibles
  onMounted(async () => {
    try {
      const bikeResponse = await getAllBikes();
      bikes.value = bikeResponse;
    } catch (error) {
      console.error("Erreur lors de la récupération des motos :", error);
    } finally {
      loading.value = false;
    }
  });

  // Mise à jour du prix en fonction de la moto sélectionnée et du nombre de jours
  const updatePrice = () => {
    const selectedBike = bikes.value.find((b) => b.id === bikeId.value);
    if (selectedBike) {
      price.value = parseFloat(selectedBike.price) * days.value;
    }
  };

  // Soumission du formulaire
  const onSubmit = async () => {
    if (!userId.value) {
      alert("Vous devez être connecté pour créer un test de moto.");
      return;
    }

    if (!bikeId.value || !startedAt.value || !days.value) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const date = new Date(startedAt.value);
    const formattedDate = {
      calendar: { identifier: "gregory" },
      era: "AD",
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };

    try {
      await createBikeTest({
        bike_id: bikeId.value,
        user_id: userId.value,
        started_at: formattedDate,
        days: days.value,
        price: price.value
      });
      alert("Test de moto créé avec succès !");
      bikeId.value = "";
      startedAt.value = "";
      days.value = 1;
      price.value = 0;
    } catch (error) {
      console.error("Erreur lors de la création du test de moto :", error);
      alert("Erreur lors de la création du test de moto.");
    }
  };
</script>
