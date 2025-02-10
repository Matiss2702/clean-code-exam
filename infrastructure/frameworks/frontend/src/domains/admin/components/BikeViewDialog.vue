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
        <DialogTitle>Détails de la moto</DialogTitle>
      </DialogHeader>
      <div class="grid gap-8 py-4">
        <div class="flex flex-col gap-4">
          <Label for="id">ID</Label>
          <Input
            id="id"
            v-model="localBike.id"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="model_name">Modèle</Label>
          <Input
            id="model_name"
            v-model="localBike.model_name"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="bike_status">Statut de la moto</Label>
          <Input
            id="bike_status"
            v-model="localBike.bike_status_name"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="purchase_date">Date d'achat</Label>
          <Input
            id="purchase_date"
            v-model="formattedPurchaseDate"
            readonly
            type="date"
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="serial_number">Numéro de série</Label>
          <Input
            id="serial_number"
            v-model="localBike.serial_number"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="mileage">Kilométrage</Label>
          <Input
            id="mileage"
            v-model="localBike.mileage"
            readonly
            type="number"
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="plate_number">Plaque d'immatriculation</Label>
          <Input
            id="plate_number"
            v-model="localBike.plate_number"
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
  import { Bike } from "@/domain/entities/Bike.ts";
  import { getModelById } from "@/services/modelService";
  import { getBikeStatusById } from "@/services/bikeStatusService";

  const props = defineProps<{ bike: Bike }>();

  const localBike = ref({ ...props.bike });
  const formattedPurchaseDate = ref("");

  watch(
    () => props.bike,
    (newBike) => {
      if (newBike) {
        localBike.value = { ...newBike };
        formattedPurchaseDate.value = formatPurchaseDate(newBike.purchase_date);
        fetchModel(newBike.model_id);
        fetchBikeStatus(newBike.bike_status_id);
      }
    }
  );

  const formatPurchaseDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0];
  };

  const fetchModel = async (modelId: string) => {
    try {
      const modelResponse = await getModelById(modelId);
      localBike.value.model_name = modelResponse.name;
    } catch (error) {
      console.error("Error fetching model", error);
    }
  };

  const fetchBikeStatus = async (bikeStatusId: string) => {
    try {
      const statusResponse = await getBikeStatusById(bikeStatusId);
      localBike.value.bike_status_name = statusResponse.name;
    } catch (error) {
      console.error("Error fetching bike status", error);
    }
  };

  onMounted(() => {
    if (props.bike) {
      formattedPurchaseDate.value = formatPurchaseDate(
        props.bike.purchase_date
      );
      fetchModel(props.bike.model_id);
      fetchBikeStatus(props.bike.bike_status_id);
    }
  });
</script>
