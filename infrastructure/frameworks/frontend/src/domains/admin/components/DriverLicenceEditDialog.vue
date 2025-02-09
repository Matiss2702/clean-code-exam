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
        <div class="flex flex-col gap-4">
          <Label for="id">ID</Label>
          <Input
            id="id"
            v-model="localLicence.id"
            readonly
          />
        </div>
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
        <div class="flex flex-col gap-4">
          <Label for="categories">Catégories</Label>
          <Input
            id="categories"
            v-model="formattedCategories"
            placeholder="Ex: A / B / C"
            required
          />
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
  import { ref, computed, watch } from "vue";
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
  import { updateDriverLicence } from "@/services/driverLicenceService";
  import { Edit } from "lucide-vue-next";
  import { DriverLicence } from "@/domain/entities/DriverLicence.ts";

  const props = defineProps<{ licence: DriverLicence }>();

  const localLicence = ref({ ...props.licence });

  const formattedCategories = computed({
    get: () => localLicence.value.categories.join(" / "),
    set: (value: string) => {
      localLicence.value.categories = value.split(" / ").map((c) => c.trim());
    }
  });

  watch(
    () => props.licence,
    (newLicence) => {
      if (newLicence) {
        localLicence.value = { ...newLicence };
      }
    }
  );

  const onSubmit = async () => {
    try {
      const id = localLicence.value.id;
      const data = {
        lastName: localLicence.value.lastName,
        firstName: localLicence.value.firstName,
        issueDate: localLicence.value.issueDate,
        expirationDate: localLicence.value.expirationDate,
        licenceNumber: localLicence.value.licenceNumber,
        points: localLicence.value.points,
        categories: localLicence.value.categories
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
