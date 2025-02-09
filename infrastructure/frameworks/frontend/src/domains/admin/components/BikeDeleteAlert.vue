<template>
  <AlertDialog>
    <AlertDialogTrigger>
      <Button
        variant="destructive"
        class="flex items-center space-x-2"
      >
        <Trash class="w-4 h-4" />
        <span class="sr-only">Supprimer</span>
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirmer la suppression ?</AlertDialogTitle>
        <AlertDialogDescription>
          Cette action ne peut pas être annulée.
          <br />
          Cela supprimera définitivement la moto :
          <strong>{{ localBike.serialNumber }}</strong>
          .
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter
        class="flex items-center justify-between sm:justify-between"
      >
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          @click="deleteBike(localBike.id)"
        >
          Supprimer
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import { Trash } from "lucide-vue-next";
  import { deleteBikeService } from "@/services/bikeService";
  import { Bike } from "@domain/entities/Bike.ts";

  const props = defineProps<{ bike: Bike }>();

  const localBike = ref({ ...props.bike });

  watch(
    () => props.bike,
    (newBike) => {
      if (newBike) {
        localBike.value = { ...newBike };
      }
    }
  );

  const deleteBike = async (id: string) => {
    try {
      await deleteBikeService(id);
      alert("Moto supprimée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression de la moto :", error);
      alert("Erreur : Impossible de supprimer la moto.");
    }
  };
</script>
