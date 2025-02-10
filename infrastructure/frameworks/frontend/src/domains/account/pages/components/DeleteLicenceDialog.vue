<template>
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        variant="destructive"
        class="flex items-center space-x-2"
      >
        <Trash class="w-4 h-4" />
        <span>Supprimer mon permis</span>
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirmer la suppression ?</AlertDialogTitle>
        <AlertDialogDescription>
          Cette action est irréversible.
          <br />
          Vous allez supprimer définitivement votre permis de conduire
          <strong>n°{{ licence.licenceNumber }}</strong>
          .
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter
        class="flex items-center justify-between sm:justify-between"
      >
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          @click="deleteLicence"
        >
          Supprimer
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
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
  import { deleteDriverLicence } from "@/services/driverLicenceService";
  import type { DriverLicence } from "@domain/entities/DriverLicence";

  const props = defineProps<{
    licence: DriverLicence;
  }>();

  const emit = defineEmits<{
    (e: "licenceDeleted"): void;
  }>();

  const deleteLicence = async () => {
    try {
      await deleteDriverLicence(props.licence.id);
      emit("licenceDeleted");
    } catch (error) {
      console.error("Erreur lors de la suppression du permis :", error);
      alert("Erreur : Impossible de supprimer le permis.");
    }
  };
</script>
