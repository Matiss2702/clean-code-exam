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
          Cela supprimera définitivement la pièce de moto :
          <strong>{{ localBikePiece.name }}</strong>
          .
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter
        class="flex items-center justify-between sm:justify-between"
      >
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          @click="deleteBikePiece(localBikePiece.id)"
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
  import { deleteBikePieceService } from "@/services/bikePieceService";
  import { BikePiece } from "@domain/entities/BikePiece.ts";

  const props = defineProps<{ bikePiece: BikePiece }>();

  const localBikePiece = ref({ ...props.bikePiece });

  watch(
    () => props.bikePiece,
    (newBikePiece) => {
      if (newBikePiece) {
        localBikePiece.value = { ...newBikePiece };
      }
    }
  );

  const deleteBikePiece = async (id: string) => {
    try {
      await deleteBikePieceService(id);
      alert("Pièce de moto supprimée avec succès !");
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de la pièce de moto :",
        error
      );
      alert("Erreur : Impossible de supprimer la pièce de moto.");
    }
  };
</script>
