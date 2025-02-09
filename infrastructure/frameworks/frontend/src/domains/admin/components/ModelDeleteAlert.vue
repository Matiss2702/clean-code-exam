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
          <strong>{{ localModel.serialNumber }}</strong>
          .
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter
        class="flex items-center justify-between sm:justify-between"
      >
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          @click="deleteModel(localModel.id)"
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
  import { deleteModelService } from "@/services/modelService";
  import { Model } from "@domain/entities/Model.ts";

  const props = defineProps<{ model: Model }>();

  const localModel = ref({ ...props.model });

  watch(
    () => props.model,
    (newModel) => {
      if (newModel) {
        localModel.value = { ...newModel };
      }
    }
  );

  const deleteModel = async (id: string) => {
    try {
      await deleteModelService(id);
      alert("Modèle supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression de la moto :", error);
      alert("Erreur : Impossible de supprimer la moto.");
    }
  };
</script>
