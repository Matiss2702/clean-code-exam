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
          Cela supprimera définitivement le test de moto associé à :
          <strong>{{ localBikeTest.userName }}</strong>
          sur la moto
          <strong>{{ localBikeTest.bikePlate }}</strong>
          .
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter
        class="flex items-center justify-between sm:justify-between"
      >
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          @click="handleDelete"
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
  import { deleteBikeTest } from "@/services/bikeTestService";
  import { BikeTest } from "@domain/entities/BikeTest.ts";

  const props = defineProps<{ bikeTest: BikeTest }>();

  const localBikeTest = ref({ ...props.bikeTest });

  watch(
    () => props.bikeTest,
    (newBikeTest) => {
      if (newBikeTest) {
        localBikeTest.value = { ...newBikeTest };
      }
    }
  );

  const handleDelete = async () => {
    try {
      await deleteBikeTest(localBikeTest.value.id);
      const alertDialog = document.querySelector("[role='alertdialog']");
      if (alertDialog) {
        alertDialog.remove();
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du test de moto :", error);
    }
  };
</script>
