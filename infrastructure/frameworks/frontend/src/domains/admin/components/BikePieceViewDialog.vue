<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="flex items-center space-x-2" variant="outline">
        <Eye class="w-4 h-4" />
        <span class="sr-only">Voir</span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Détails de la Pièce de Moto</DialogTitle>
      </DialogHeader>
      <div class="grid gap-8 py-4">
        <div class="flex flex-col gap-4">
          <Label for="id">ID</Label>
          <Input id="id" v-model="localBikePiece.id" readonly />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="bike_id">Moto</Label>
          <Input id="bike_id" v-model="bikeDisplayName" readonly />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="name">Nom</Label>
          <Input id="name" v-model="localBikePiece.name" readonly />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="reference">Référence</Label>
          <Input id="reference" v-model="localBikePiece.reference" readonly />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="price">Prix</Label>
          <Input id="price" v-model="localBikePiece.price" readonly type="number" />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="maintenance_period_alert">Période d'entretien (en jours)</Label>
          <Input id="maintenance_period_alert" v-model="localBikePiece.maintenance_period_alert" readonly type="number" />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="stock">Stock disponible</Label>
          <Input id="stock" v-model="localBikePiece.stock" readonly type="number" />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="stock_alert">Alerte de stock bas</Label>
          <Input id="stock_alert" v-model="localBikePiece.stock_alert" readonly type="number" />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from "vue";
  import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { Eye } from "lucide-vue-next";
  import { BikePiece } from "@domain/entities/BikePiece";
  import { getModelById } from "@/services/modelService";
  import { getBikeById } from "@/services/bikeService";

  const props = defineProps<{ bikePiece: BikePiece }>();

  const localBikePiece = ref({ ...props.bikePiece });
  const bikeDisplayName = ref("Chargement...");

  const fetchBikeDetails = async (bikeId: string) => {
    try {
      const bikeResponse = await getBikeById(bikeId);
      const modelResponse = await getModelById(bikeResponse.model_id);

      bikeDisplayName.value = modelResponse
        ? `${bikeResponse.plate_number} - ${modelResponse.name}`
        : `${bikeResponse.plate_number} - Modèle inconnu`;
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de la moto", error);
      bikeDisplayName.value = "Moto non trouvée";
    }
  };

  watch(
    () => props.bikePiece,
    (newBikePiece) => {
      if (newBikePiece) {
        localBikePiece.value = { ...newBikePiece };
        fetchBikeDetails(newBikePiece.bike_id);
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    if (props.bikePiece) {
      fetchBikeDetails(props.bikePiece.bike_id);
    }
  });
</script>
