<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Ajouter une marque</span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Créer une marque</DialogTitle>
        <DialogDescription>
          Remplissez le formulaire ci-dessous pour ajouter une nouvelle marque.
        </DialogDescription>
      </DialogHeader>
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 gap-4 py-4"
      >
        <div class="flex flex-col gap-4">
          <Label for="name">Nom</Label>
          <Input
            id="name"
            v-model="brandName"
            placeholder="Entrez le nom de la marque"
            required
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="description">Description</Label>
          <Textarea
            id="description"
            v-model="brandDescription"
            placeholder="Description de la marque"
            required
          ></Textarea>
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
  import { Textarea } from "@/components/ui/textarea";
  import { Plus } from "lucide-vue-next";
  import { createBrand } from "@/services/brandService";

  const brandName = ref("");
  const brandDescription = ref("");

  const onSubmit = async () => {
    if (!brandName.value) {
      alert("Veuillez entrer un nom pour la marque.");
      return;
    }
    try {
      console.log("Données envoyées pour créer une marque :", brandName.value);
      await createBrand({
        name: brandName.value,
        description: brandDescription.value
      });
      alert("Marque créée avec succès !");
      brandName.value = "";
      brandDescription.value = "";
    } catch (error) {
      console.error("Erreur lors de la création de la marque :", error);
      alert("Erreur : Impossible de créer la marque.");
    }
  };
</script>
