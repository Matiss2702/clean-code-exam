<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button
        class="flex items-center space-x-2"
        variant="outline"
      >
        <Eye class="w-4 h-4" />
        <span class="sr-only">Voir</span>
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Voir une catégorie de permis</DialogTitle>
        <DialogDescription>
          Détails de la catégorie de permis sélectionnée.
        </DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <!-- Champ ID -->
        <div class="flex flex-col gap-4">
          <Label for="id">ID</Label>
          <Input
            id="id"
            v-model="localCategory.id"
            readonly
          />
        </div>

        <!-- Champ Nom de la catégorie -->
        <div class="flex flex-col gap-4">
          <Label for="name">Nom de la catégorie</Label>
          <Input
            id="name"
            v-model="localCategory.name"
            readonly
          />
        </div>

        <!-- Champ Type de transmission -->
        <div class="flex flex-col gap-4">
          <Label for="transmissionType">Type de transmission</Label>
          <Input
            id="transmissionType"
            v-model="localCategory.transmission_type"
            readonly
          />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { Eye } from "lucide-vue-next";

  import { LicenceCategory } from "@domain/entities/LicenceCategory.ts";

  const props = defineProps<{ category: LicenceCategory }>();

  const localCategory = ref<LicenceCategory>({ ...props.category });

  // Surveille les changements de props.category
  watch(
    () => props.category,
    (newCategory) => {
      if (newCategory) {
        localCategory.value = { ...newCategory };
      }
    }
  );
</script>
