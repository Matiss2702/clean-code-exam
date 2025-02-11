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
        <DialogTitle>Détails du Test de Moto</DialogTitle>
      </DialogHeader>
      <div class="grid gap-8 py-4">
        <!-- ID du Test -->
        <div class="flex flex-col gap-4">
          <Label for="id">ID</Label>
          <Input
            id="id"
            v-model="localBikeTest.id"
            readonly
          />
        </div>

        <!-- Utilisateur -->
        <div class="flex flex-col gap-4">
          <Label for="user_name">Utilisateur</Label>
          <Input
            id="user_name"
            v-model="localBikeTest.user_name"
            readonly
          />
        </div>

        <!-- Moto -->
        <div class="flex flex-col gap-4">
          <Label for="bike_plate">Moto</Label>
          <Input
            id="bike_plate"
            v-model="localBikeTest.bike_plate"
            readonly
          />
        </div>

        <!-- Date de début -->
        <div class="flex flex-col gap-4">
          <Label for="started_at">Date de début</Label>
          <Input
            id="started_at"
            v-model="formattedStartedAt"
            readonly
            type="date"
          />
        </div>

        <!-- Date de fin -->
        <div class="flex flex-col gap-4">
          <Label for="ended_at">Date de fin</Label>
          <Input
            id="ended_at"
            v-model="formattedEndedAt"
            readonly
            type="date"
          />
        </div>

        <!-- Prix du test -->
        <div class="flex flex-col gap-4">
          <Label for="price">Prix</Label>
          <Input
            id="price"
            v-model="localBikeTest.price"
            readonly
            type="number"
          />
        </div>

        <!-- Statut du test -->
        <div class="flex flex-col gap-4">
          <Label for="is_accepted">Statut</Label>
          <Input
            id="is_accepted"
            v-model="statusText"
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
  import { BikeTest } from "@/domain/entities/BikeTest.ts";
  import { getUserById } from "@/services/userService";
  import { getBikeById } from "@/services/bikeService";

  const props = defineProps<{ bikeTest: BikeTest }>();

  const localBikeTest = ref({ ...props.bikeTest });
  const formattedStartedAt = ref("");
  const formattedEndedAt = ref("");
  const statusText = ref("");

  watch(
    () => props.bikeTest,
    (newBikeTest) => {
      if (newBikeTest) {
        localBikeTest.value = { ...newBikeTest };
        formattedStartedAt.value = formatDate(newBikeTest.started_at);
        formattedEndedAt.value = formatDate(newBikeTest.ended_at);
        fetchUser(newBikeTest.user_id);
        fetchBike(newBikeTest.bike_id);
        statusText.value = newBikeTest.is_accepted ? "Accepté" : "En attente";
      }
    }
  );

  const formatDate = (isoDate: string | null | undefined) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return isNaN(date.getTime()) ? "N/A" : date.toISOString().split("T")[0];
  };

  const fetchUser = async (userId: string) => {
    try {
      const userResponse = await getUserById(userId);
      localBikeTest.value.user_name = userResponse.name;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur", error);
    }
  };

  const fetchBike = async (bikeId: string) => {
    try {
      const bikeResponse = await getBikeById(bikeId);
      localBikeTest.value.bike_plate = bikeResponse.plate_number;
    } catch (error) {
      console.error("Erreur lors de la récupération de la moto", error);
    }
  };

  onMounted(() => {
    if (props.bikeTest) {
      formattedStartedAt.value = formatDate(props.bikeTest.started_at);
      formattedEndedAt.value = formatDate(props.bikeTest.ended_at);
      fetchUser(props.bikeTest.user_id);
      fetchBike(props.bikeTest.bike_id);
      statusText.value = props.bikeTest.is_accepted ? "Accepté" : "En attente";
    }
  });
</script>
