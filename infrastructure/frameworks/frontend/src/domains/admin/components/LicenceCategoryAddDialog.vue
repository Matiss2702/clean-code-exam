<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Ajouter une catégorie de permis</span>
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Créer une catégorie de permis</DialogTitle>
        <DialogDescription>
          Choisissez un nom et un type de transmission.
        </DialogDescription>
      </DialogHeader>

      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 gap-4 py-4"
      >
        <!-- Nom de la catégorie -->
        <div class="flex flex-col gap-2">
          <Label for="name">Nom de la catégorie</Label>
          <Input
            id="name"
            v-model="name"
            placeholder="Ex: B"
            required
          />
        </div>

        <!-- Type de transmission -->
        <div class="flex flex-col gap-2">
          <Label for="transmissionType">Type de transmission</Label>
          <select
            id="transmissionType"
            v-model="transmissionType"
            class="p-2 border rounded"
            required
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
            Créer
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { Button } from "@/components/ui/button";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Plus } from "lucide-vue-next";

  import { createLicenceCategory } from "@/services/licenceCategoryService";

  const name = ref("");
  const transmissionType = ref<"manuelle" | "automatique">("manuelle");

  const onSubmit = async () => {
    try {
      if (!name.value.trim()) {
        alert("Veuillez renseigner le nom de la catégorie.");
        return;
      }
      if (!transmissionType.value) {
        alert("Veuillez sélectionner un type de transmission.");
        return;
      }

      await createLicenceCategory({
        name: name.value.trim(),
        transmissionType: transmissionType.value
      });

      alert("Catégorie de permis créée avec succès !");
      name.value = "";
      transmissionType.value = "manuelle";
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie :", error);
      alert("Impossible de créer la catégorie.");
    }
  };
</script>
