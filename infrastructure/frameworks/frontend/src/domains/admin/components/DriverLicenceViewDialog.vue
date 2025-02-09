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
        <DialogTitle>Voir un permis de conduire</DialogTitle>
        <DialogDescription>
          Détails du permis de conduire sélectionné.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="flex flex-col gap-4">
          <Label for="id">ID</Label>
          <Input
            id="id"
            v-model="localLicence.id"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="lastName">Nom</Label>
          <Input
            id="lastName"
            v-model="localLicence.lastName"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="firstName">Prénom</Label>
          <Input
            id="firstName"
            v-model="localLicence.firstName"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="licenceNumber">Numéro de permis</Label>
          <Input
            id="licenceNumber"
            v-model="localLicence.licenceNumber"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="issueDate">Date de délivrance</Label>
          <Input
            id="issueDate"
            type="date"
            v-model="formattedIssueDate"
            readonly
          />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="expirationDate">Date d'expiration</Label>
          <Input
            id="expirationDate"
            type="date"
            v-model="formattedExpirationDate"
            readonly
          />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from "vue";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { Eye } from "lucide-vue-next";
  import { DriverLicence } from "@domain/entities/DriverLicence.ts";

  const props = defineProps<{ licence: DriverLicence }>();

  const localLicence = ref<DriverLicence>({ ...props.licence });

  watch(
    () => props.licence,
    (newLicence) => {
      if (newLicence) {
        localLicence.value = { ...newLicence };
      }
    }
  );

  // ✅ Formater les dates pour qu'elles s'affichent correctement
  const formattedIssueDate = computed(() =>
    localLicence.value.issueDate
      ? new Date(localLicence.value.issueDate).toISOString().split("T")[0]
      : ""
  );

  const formattedExpirationDate = computed(() =>
    localLicence.value.expirationDate
      ? new Date(localLicence.value.expirationDate).toISOString().split("T")[0]
      : ""
  );
</script>
