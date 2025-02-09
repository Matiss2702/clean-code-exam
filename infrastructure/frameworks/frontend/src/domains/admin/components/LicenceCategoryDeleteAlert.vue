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
          Vous allez supprimer définitivement la catégorie de permis :
          <strong>
            {{ localCategory.name }}
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
          @click="deleteCategory(localCategory.id)"
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

  // ✅ Service pour supprimer une catégorie
  import { deleteLicenceCategory } from "@/services/licenceCategoryService";

  // ✅ Entité LicenceCategory
  import { LicenceCategory } from "@domain/entities/LicenceCategory.ts";

  // Props : on reçoit la catégorie à supprimer
  const props = defineProps<{ category: LicenceCategory }>();

  // Copie locale de la catégorie
  const localCategory = ref<LicenceCategory>({ ...props.category });

  // Surveille les changements de props.category
  watch(
    () => props.category,
    (newCategory) => {
      if (newCategory) {
        localCategory.value = { ...newCategory };
      }
    }
  );

  // Méthode pour supprimer la catégorie
  const deleteCategory = async (id: string) => {
    try {
      await deleteLicenceCategory(id);
      alert("Catégorie de permis supprimée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error);
      alert("Erreur : Impossible de supprimer la catégorie.");
    }
  };
</script>
