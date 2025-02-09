<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Ajouter un permis</span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Créer un permis de conduire</DialogTitle>
        <DialogDescription>
          Remplissez le formulaire ci-dessous pour assigner un permis à un
          utilisateur.
        </DialogDescription>
      </DialogHeader>
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 gap-4 py-4"
      >
        <div class="flex flex-col gap-4">
          <Label for="user">Utilisateur</Label>
          <select
            v-model="userId"
            id="user"
            class="p-2 border rounded"
          >
            <option
              value=""
              disabled
            >
              Choisir un utilisateur
            </option>
            <option
              v-for="user in users"
              :key="user.id"
              :value="user.id"
            >
              {{ user.name }} ({{ user.id }})
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-4">
          <Label for="licenceNumber">Numéro de permis</Label>
          <Input
            id="licenceNumber"
            v-model="licenceNumber"
            required
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="issueDate">Date de délivrance</Label>
          <Input
            id="issueDate"
            v-model="issueDate"
            type="date"
            required
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="expirationDate">Date d'expiration</Label>
          <Input
            id="expirationDate"
            v-model="expirationDate"
            type="date"
            required
          />
        </div>
        <DialogFooter class="mt-4">
          <Button
            type="submit"
            class="w-full"
          >
            Créer
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import {
    createDriverLicence,
    getAllUsers
  } from "@/services/driverLicenceService";
  import { Button } from "@/components/ui/button";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Plus } from "lucide-vue-next";

  const userId = ref("");
  const licenceNumber = ref("");
  const issueDate = ref("");
  const expirationDate = ref("");
  const users = ref<{ id: string; name: string }[]>([]);

  const fetchUsers = async () => {
    try {
      users.value = await getAllUsers();
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  const onSubmit = async () => {
    if (!userId.value) {
      alert("Veuillez sélectionner un utilisateur.");
      return;
    }

    try {
      await createDriverLicence({
        userId: userId.value,
        licenceNumber: licenceNumber.value,
        issueDate: issueDate.value,
        expirationDate: expirationDate.value
      });
      alert("Permis de conduire créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création du permis :", error);
      alert("Erreur : Impossible de créer le permis.");
    }
  };

  onMounted(fetchUsers);
</script>
