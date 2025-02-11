<template>
  <div class="w-full max-w-2xl p-4 pt-8 mx-auto">
    <div
      v-if="loading"
      class="p-4 text-center"
    >
      Chargement...
    </div>

    <template v-else>
      <div
        v-if="hasLicence"
        class="flex flex-col items-center"
      >
        <DriverLicenceCard :licence="licence" />
        <div class="mt-4">
          <DeleteLicenceDialog
            :licence="licence"
            @licence-deleted="handleLicenceDeleted"
          />
        </div>
      </div>

      <DriverLicenceForm
        v-else
        @licence-added="fetchLicence"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from "vue";
  import DriverLicenceCard from "./components/DriverLicenceCard.vue";
  import DriverLicenceForm from "./components/DriverLicenceForm.vue";
  import DeleteLicenceDialog from "./components/DeleteLicenceDialog.vue";
  import { getDriverLicencesByUserId } from "@/services/driverLicenceService";
  import { useAuthStore } from "@/stores/authStore";
  import type { DriverLicence } from "@domain/entities/DriverLicence";

  const authStore = useAuthStore();
  const loading = ref(true);
  const licence = ref<DriverLicence | null>(null);

  const hasLicence = computed(() => licence.value !== null);

  // Récupération de l'UUID utilisateur depuis le store d'authentification
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

  const fetchLicence = async () => {
    loading.value = true;
    try {
      if (!userId.value) {
        console.error("ID utilisateur introuvable");
        return;
      }
      const licences = await getDriverLicencesByUserId(userId.value);
      if (Array.isArray(licences) && licences.length > 0) {
        licence.value = licences[0];
      } else {
        licence.value = null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du permis :", error);
      licence.value = null;
    } finally {
      loading.value = false;
    }
  };

  const handleLicenceDeleted = () => {
    licence.value = null;
  };

  onMounted(() => {
    fetchLicence();
  });
</script>
