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
        <DialogTitle>Détails de la marque</DialogTitle>
      </DialogHeader>
      <div class="grid gap-8 py-4">
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
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="description">Description</Label>
          <Textarea
            id="description"
            v-model="localBrand.description"
            placeholder="Description de la marque"
            readonly
          >
            {{ localBrand.description }}
          </Textarea>
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
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { Eye } from "lucide-vue-next";
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
</script>
