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
        <DialogTitle>Détails du modèle</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="flex flex-col gap-4">
          <Label for="id">ID</Label>
          <Input
            id="id"
            v-model="localModel.id"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="brand_id">Marque</Label>
          <Input
            id="brand_id"
            v-model="localModel.brand_name"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="bike_category_id">Catégorie de Moto</Label>
          <Input
            id="bike_category_id"
            v-model="localModel.bike_category_name"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="name">Nom</Label>
          <Input
            id="name"
            v-model="localModel.name"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="maintenance_mileage_alert">Alerte Kilométrage</Label>
          <Input
            id="maintenance_mileage_alert"
            v-model="localModel.maintenance_mileage_alert"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="maintenance_period_alert">Alerte Période</Label>
          <Input
            id="maintenance_period_alert"
            v-model="localModel.maintenance_period_alert"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="top_case">Top Case</Label>
          <Input
            id="top_case"
            v-model="localModel.top_case"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="seat">Siège</Label>
          <Input
            id="seat"
            v-model="localModel.seat"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="transmission_type">Type de Transmission</Label>
          <Input
            id="transmission_type"
            v-model="localModel.transmission_type"
            readonly
          />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted } from "vue";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { Eye } from "lucide-vue-next";
  import { Model } from "@/domain/entities/Model.ts";
  import { getBrandById } from "@/services/brandService";
  import { getBikeCategoryById } from "@/services/bikeCategoryService";

  const props = defineProps<{ model: Model }>();

  const localModel = ref({ ...props.model });

  watch(
    () => props.model,
    (newModel) => {
      if (newModel) {
        localModel.value = { ...newModel };
        fetchBrand(localModel.value.brand_id);
        fetchBikeCategory(localModel.value.bike_category_id);
      }
    }
  );

  const fetchBrand = async (brand_id: string) => {
    try {
      const brandResponse = await getBrandById(brand_id);
      localModel.value.brand_name = brandResponse.name;
    } catch (error) {
      console.error("Erreur lors de la récupération du modèle :", error);
    }
  };

  const fetchBikeCategory = async (bike_category_id: string) => {
    try {
      const bikeCategoryResponse = await getBikeCategoryById(bike_category_id);
      localModel.value.bike_category_name = bikeCategoryResponse.name;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la catégorie de moto :",
        error
      );
    }
  };

  onMounted(() => {
    if (props.model) {
      fetchBrand(props.model.brand_id);
      fetchBikeCategory(props.model.bike_category_id);
    }
  });
</script>
