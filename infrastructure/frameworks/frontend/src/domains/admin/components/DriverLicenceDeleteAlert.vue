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
          Cette action est irréversible.
          <br />
          Vous allez supprimer définitivement le permis de :
          <strong>
            {{ localLicence.firstName }} {{ localLicence.lastName }}
          </strong>
          .
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter
        class="flex items-center justify-between sm:justify-between"
      >
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          @click="deleteLicence(localLicence.id)"
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
  import { deleteDriverLicence } from "@/services/driverLicenceService";
  import { DriverLicence } from "@domain/entities/DriverLicence.ts";

  const props = defineProps<{ licence: DriverLicence }>();

  const localLicence = ref({ ...props.licence });

  watch(
    () => props.licence,
    (newLicence) => {
      if (newLicence) {
        localLicence.value = { ...newLicence };
      }
    }
  );

  const deleteLicence = async (id: string) => {
    try {
      await deleteDriverLicence(id);
      alert("Permis de conduire supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression du permis :", error);
      alert("Erreur : Impossible de supprimer le permis.");
    }
  };
</script>
