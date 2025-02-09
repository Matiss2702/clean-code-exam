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
        <DialogTitle>Modifier la marque</DialogTitle>
      </DialogHeader>
      <form
        @submit.prevent="onSubmit"
        class="grid gap-8 py-4"
      >
        <div class="flex flex-col gap-4">
          <Label for="id">ID</Label>
          <Input
            id="id"
            v-model="localBrand.id"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="name">Nom</Label>
          <Input
            id="name"
            v-model="localBrand.name"
            placeholder="Modifier le nom de la marque"
            required
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="description">Description</Label>
          <Textarea
            id="description"
            v-model="localBrand.description"
            placeholder="Description de la marque"
            required
          >
            {{ localBrand.description }}
          </Textarea>
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
  import { updateBrand } from "@/services/brandService";
  import { Textarea } from "@/components/ui/textarea";
  import { Edit } from "lucide-vue-next";
  import { Brand } from "@domain/entities/Brand.ts";

  const props = defineProps<{ brand: Brand }>();

  const localBrand = ref({ ...props.brand });

  watch(
    () => props.brand,
    (newBrand) => {
      if (newBrand) {
        localBrand.value = { ...newBrand };
      }
    }
  );

  const onSubmit = async () => {
    try {
      const id = localBrand.value.id;
      const data = {
        name: localBrand.value.name,
        description: localBrand.value.description
      };
      console.log("data", data);
      await updateBrand(id, data);
      alert("Marque modifiée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la modification de la marque :", error);
      alert("Erreur : Impossible de modifier la marque.");
    }
  };
</script>
