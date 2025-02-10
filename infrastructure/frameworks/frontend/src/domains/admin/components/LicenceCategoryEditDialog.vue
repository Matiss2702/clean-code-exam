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
        <DialogTitle>Modifier la catégorie de permis</DialogTitle>
      </DialogHeader>

      <form
        @submit.prevent="onSubmit"
        class="grid gap-8 py-4"
      >
        <!-- Champ ID -->
        <div class="flex flex-col gap-4">
          <Label for="id">ID</Label>
          <Input
            id="id"
            v-model="localCategory.id"
            readonly
          />
        </div>

        <div class="flex flex-col gap-4">
          <Label for="name">Nom de la catégorie</Label>
          <Input
            id="name"
            v-model="localCategory.name"
            required
          />
        </div>

        <div class="flex flex-col gap-4">
          <Label for="transmission_type">Type de transmission</Label>
          <select
            id="transmission_type"
            v-model="localCategory.transmission_type"
            required
            class="p-2 border rounded"
          >
            <option value="manuelle">Manuelle</option>
            <option value="automatique">Automatique</option>
          </select>
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
  import { ref, watch } from "vue";
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

  import { updateLicenceCategory } from "@/services/licenceCategoryService";
  import { LicenceCategory } from "@domain/entities/LicenceCategory.ts";

  const props = defineProps<{ category: LicenceCategory }>();

  const localCategory = ref<LicenceCategory>({ ...props.category });

  watch(
    () => props.category,
    (newVal) => {
      if (newVal) {
        localCategory.value = { ...newVal };
      }
    }
  );

  const onSubmit = async () => {
    try {
      const { id, name, transmission_type } = localCategory.value;
      const updatedData = { name, transmission_type };

      console.log("Données envoyées :", updatedData);
      await updateLicenceCategory(id, updatedData);
      alert("Catégorie mise à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la modification de la catégorie :", error);
      alert("Impossible de modifier la catégorie.");
    }
  };
</script>
