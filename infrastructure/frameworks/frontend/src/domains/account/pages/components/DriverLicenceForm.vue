<template>
  <div class="max-w-md p-4 mx-auto border rounded shadow">
    <h2 class="mb-4 text-2xl font-bold">Ajouter mon permis de conduire</h2>
    <form
      @submit.prevent="onSubmit"
      class="space-y-4"
    >
      <!-- Numéro de permis -->
      <div>
        <Label
          for="licenceNumber"
          class="block mb-1"
        >
          Numéro de permis
        </Label>
        <Input
          id="licenceNumber"
          v-model="licenceNumber"
          placeholder="Ex: 123456789"
          required
        />
      </div>
      <!-- Date de délivrance -->
      <div>
        <Label
          for="issueDate"
          class="block mb-1"
        >
          Date de délivrance
        </Label>
        <Input
          id="issueDate"
          type="date"
          v-model="issueDate"
          required
        />
      </div>
      <!-- Date d'expiration -->
      <div>
        <Label
          for="expirationDate"
          class="block mb-1"
        >
          Date d'expiration
        </Label>
        <Input
          id="expirationDate"
          type="date"
          v-model="expirationDate"
          required
        />
      </div>
      <!-- Sélecteur multiple des catégories -->
      <div>
        <Label
          for="categories"
          class="block mb-1"
        >
          Catégories
        </Label>
        <select
          id="categories"
          v-model="selectedCategories"
          multiple
          class="w-full p-2 border rounded"
        >
          <option
            v-for="cat in availableCategories"
            :key="cat.id"
            :value="cat.id"
          >
            {{ cat.name }} ({{ cat.transmission_type }})
          </option>
        </select>
        <small class="text-gray-500">
          Maintenez Ctrl (ou Cmd sur Mac) pour sélectionner plusieurs
          catégories.
        </small>
      </div>
      <Button
        type="submit"
        class="w-full text-white bg-blue-500"
      >
        Ajouter mon permis
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from "vue";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { createDriverLicence } from "@/services/driverLicenceService";
  import { getAllLicenceCategories } from "@/services/licenceCategoryService";
  import { useAuthStore } from "../../../../stores/authStore";

  // Fonction utilitaire pour décoder un JWT et extraire le payload
  function decodeJWT(token: string): any {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Token JWT invalide");
      }
      const payloadBase64 = parts[1];
      const padded = payloadBase64.padEnd(
        payloadBase64.length + ((4 - (payloadBase64.length % 4)) % 4),
        "="
      );
      return JSON.parse(atob(padded));
    } catch (error) {
      console.error("Erreur lors du décodage du token :", error);
      return null;
    }
  }

  const authStore = useAuthStore();

  const userId = computed(() => {
    if (authStore.user && authStore.user.id) {
      return authStore.user.id;
    } else if (authStore.token) {
      const payload = decodeJWT(authStore.token);
      return payload?.userId || "";
    }
    return "";
  });

  // Champs du formulaire
  const licenceNumber = ref("");
  const issueDate = ref("");
  const expirationDate = ref("");
  const selectedCategories = ref<string[]>([]);

  // Liste de toutes les catégories disponibles
  const availableCategories = ref<
    {
      id: string;
      name: string;
      transmission_type: "manuelle" | "automatique";
    }[]
  >([]);

  const fetchCategories = async () => {
    try {
      availableCategories.value = await getAllLicenceCategories();
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }
  };

  onMounted(() => {
    fetchCategories();
    console.log("ID de l'utilisateur récupéré :", userId.value);
  });

  const onSubmit = async () => {
    if (!userId.value) {
      alert("Vous devez être connecté pour ajouter un permis.");
      return;
    }
    try {
      const data = {
        userId: userId.value,
        licenceNumber: licenceNumber.value,
        issueDate: issueDate.value,
        expirationDate: expirationDate.value,
        categories: selectedCategories.value
      };

      await createDriverLicence(data);
      alert("Votre permis a été ajouté avec succès !");
      licenceNumber.value = "";
      issueDate.value = "";
      expirationDate.value = "";
      selectedCategories.value = [];
    } catch (error) {
      console.error("Erreur lors de la création du permis :", error);
      alert("Erreur lors de l'ajout du permis.");
    }
  };
</script>
