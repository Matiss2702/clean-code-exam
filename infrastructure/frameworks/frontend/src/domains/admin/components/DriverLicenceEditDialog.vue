<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button
        class="flex items-center space-x-2"
        variant="outline"
      >
        <Edit class="w-4 h-4" />
        <span class="sr-only">Modifier</span>
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Modifier le permis de conduire</DialogTitle>
      </DialogHeader>

      <form
        @submit.prevent="onSubmit"
        class="grid gap-8 py-4"
      >
        <!-- Champ ID (lecture seule) -->
        <div class="flex flex-col gap-4">
          <Label for="id">ID</Label>
          <Input
            id="id"
            v-model="localLicence.id"
            readonly
          />
        </div>

        <!-- Nom et Prénom -->
        <div class="flex flex-col gap-4">
          <Label for="lastName">Nom</Label>
          <Input
            id="lastName"
            v-model="localLicence.lastName"
            placeholder="Nom de famille"
            required
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="firstName">Prénom</Label>
          <Input
            id="firstName"
            v-model="localLicence.firstName"
            placeholder="Prénom"
            required
          />
        </div>

        <!-- Dates et numéro de permis -->
        <div class="flex flex-col gap-4">
          <Label for="issueDate">Date de délivrance</Label>
          <Input
            id="issueDate"
            v-model="localLicence.issueDate"
            type="date"
            required
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="expirationDate">Date d'expiration</Label>
          <Input
            id="expirationDate"
            v-model="localLicence.expirationDate"
            type="date"
            required
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="licenceNumber">Numéro de permis</Label>
          <Input
            id="licenceNumber"
            v-model="localLicence.licenceNumber"
            placeholder="Numéro de permis"
            required
          />
        </div>

        <!-- Sélecteur multi pour les catégories -->
        <div class="flex flex-col gap-4">
          <Label for="categories">Catégories</Label>
          <select
            id="categories"
            v-model="selectedCategories"
            multiple
            class="p-2 border rounded"
          >
            <option
              v-for="cat in availableCategories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }} ({{ cat.transmission_type }})
            </option>
          </select>
          <small class="text-gray-600">
            Maintenez Ctrl (ou Cmd sur Mac) pour sélectionner plusieurs
            catégories.
          </small>
        </div>

        <DialogFooter class="mt-4">
          <Button
            type="submit"
            class="w-full"
          >
            Enregistrer les modifications
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted, computed } from "vue";
  import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { Edit } from "lucide-vue-next";

  // Services
  import { updateDriverLicence } from "@/services/driverLicenceService";
  import { getAllLicenceCategories } from "@/services/licenceCategoryService";

  // Entité
  import { DriverLicence } from "@/domain/entities/DriverLicence.ts";

  // On attend la prop "licence" (DriverLicence) incluant un champ "categories"
  // On suppose que "categories" est un tableau d'objets de type LicenceCategory
  const props = defineProps<{
    licence: DriverLicence & {
      categories?: {
        id: string;
        name: string;
        transmission_type: "manuelle" | "automatique";
      }[];
    };
  }>();

  // Copie locale de la licence
  const localLicence = ref({ ...props.licence });

  // Liste de toutes les catégories disponibles
  const availableCategories = ref<
    {
      id: string;
      name: string;
      transmission_type: "manuelle" | "automatique";
    }[]
  >([]);

  // Tableau d'IDs sélectionnés pour le multi-select
  const selectedCategories = ref<string[]>([]);

  // Synchroniser la prop si elle change
  watch(
    () => props.licence,
    (newLicence) => {
      if (newLicence) {
        localLicence.value = { ...newLicence };
        selectedCategories.value = newLicence.categories
          ? newLicence.categories.map((cat) => cat.id)
          : [];
      }
    },
    { immediate: true }
  );

  // Récupérer la liste de toutes les catégories
  const fetchCategories = async () => {
    try {
      availableCategories.value = await getAllLicenceCategories();
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }
  };

  onMounted(() => {
    fetchCategories();
    // Initialiser selectedCategories si nécessaire
    selectedCategories.value = localLicence.value.categories
      ? localLicence.value.categories.map((cat) => cat.id)
      : [];
  });

  const onSubmit = async () => {
    try {
      const id = localLicence.value.id;
      const data = {
        lastName: localLicence.value.lastName,
        firstName: localLicence.value.firstName,
        issueDate: localLicence.value.issueDate,
        expirationDate: localLicence.value.expirationDate,
        licenceNumber: localLicence.value.licenceNumber,
        userId: localLicence.value.userId,
        categories: selectedCategories.value
      };

      console.log("Données envoyées :", data);
      await updateDriverLicence(id, data);
      alert("Permis de conduire modifié avec succès !");
    } catch (error) {
      console.error(
        "Erreur lors de la modification du permis de conduire :",
        error
      );
      alert("Erreur : Impossible de modifier le permis.");
    }
  };
</script>
