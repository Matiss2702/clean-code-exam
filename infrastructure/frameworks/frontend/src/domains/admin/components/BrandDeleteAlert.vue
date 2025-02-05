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
          Cela supprimera définitivement la marque :
          <strong>{{ localBrand.name }}</strong>
          .
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter
        class="flex items-center justify-between sm:justify-between"
      >
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          @click="deleteBrand(localBrand.id)"
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
  import { deleteBrandService } from "@/services/brandService";
  import { Brand } from "@/domain/entities/Brand.ts";

  const props = defineProps<{ brand: Brand }>();

  const localBrand = ref({ ...props.brand });

  watch(
    () => props.brand,
    (newBrand) => {
      if (newBrand) {
        localBrand.value = { ...newBrand };
      }
    }
  );

  const deleteBrand = async (id: string) => {
    try {
      await deleteBrandService(id);
      alert("Marque supprimée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression de la marque :", error);
      alert("Erreur : Impossible de supprimer la marque.");
    }
  };
</script>
