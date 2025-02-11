<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Ajouter une pièce de moto</span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Ajouter une Pièce de Moto</DialogTitle>
        <DialogDescription>
          Remplissez le formulaire ci-dessous pour ajouter une nouvelle pièce de moto.
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-4 py-4">
        <FormField name="bike_id">
          <FormItem class="flex flex-col">
            <FormLabel>Moto</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button variant="outline" class="justify-between w-full">
                    {{
                      bikeId
                        ? `${bikes.find((b) => b.id === bikeId)?.plate_number} - ${models.find((m) => m.id === selectedModelId)?.name || 'Modèle inconnu'}`
                        : "Sélectionner une moto"
                    }}
                    <ChevronsUpDown class="w-4 h-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-[250px] p-0">
                <Command>
                  <CommandInput placeholder="Chercher une moto..." />
                  <CommandEmpty>Aucune moto trouvée.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="bike in bikes"
                        :key="bike.id"
                        :value="bike.id"
                        @select="() => setBike(bike.id, bike.model_id)"
                      >
                        <Check :class="bikeId === bike.id ? 'opacity-100' : 'opacity-0'" />
                        {{ getModelName(bike.model_id) }} - {{ bike.plate_number }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        </FormField>

        <FormField name="name">
          <FormItem class="flex flex-col">
            <FormLabel>Nom de la pièce</FormLabel>
            <FormControl>
              <Input v-model="name" type="text" required />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="reference">
          <FormItem class="flex flex-col">
            <FormLabel>Référence</FormLabel>
            <FormControl>
              <Input v-model="reference" type="text" required />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="price">
          <FormItem class="flex flex-col">
            <FormLabel>Prix</FormLabel>
            <FormControl>
              <Input v-model="price" type="number" min="0" required />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="maintenance_period_alert">
          <FormItem class="flex flex-col">
            <FormLabel>Alerte de maintenance (km)</FormLabel>
            <FormControl>
              <Input v-model="maintenancePeriodAlert" type="number" min="0" />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="stock">
          <FormItem class="flex flex-col">
            <FormLabel>Stock</FormLabel>
            <FormControl>
              <Input v-model="stock" type="number" min="0" required />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="stock_alert">
          <FormItem class="flex flex-col">
            <FormLabel>Alerte de Stock Bas</FormLabel>
            <FormControl>
              <Input v-model="stockAlert" type="number" min="0" />
            </FormControl>
          </FormItem>
        </FormField>

        <DialogFooter class="mt-4">
          <Button type="submit" class="w-full">Ajouter</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
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
  import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
  import { Plus, Check, ChevronsUpDown } from "lucide-vue-next";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger
  } from "@/components/ui/popover";
  import {
    Command,
    CommandInput,
    CommandEmpty,
    CommandList,
    CommandItem,
    CommandGroup
  } from "@/components/ui/command";
  import { createBikePiece } from "@/services/bikePieceService";
  import { getAllBikes } from "@/services/bikeService";
  import { getAllModels } from "@/services/modelService";

  const bikeId = ref("");
  const name = ref("");
  const reference = ref("");
  const price = ref(0);
  const maintenancePeriodAlert = ref(0);
  const stock = ref(0);
  const stockAlert = ref(0);
  const bikes = ref<{ id: string; plate_number: string; model_id: string }[]>([]);
  const models = ref<{ id: string; name: string }[]>([]);
  const selectedModelId = ref("");

  onMounted(async () => {
    try {
      const bikeResponse = await getAllBikes();
      bikes.value = bikeResponse;

      const modelResponse = await getAllModels();
      models.value = modelResponse;
    } catch (error) {
      console.error("Erreur lors de la récupération des motos et modèles", error);
    }
  });

  const setBike = (id: string, modelId: string) => {
    bikeId.value = id;
    selectedModelId.value = modelId;
  };

  const getModelName = (modelId: string) => {
    return models.value.find((m) => m.id === modelId)?.name || "Modèle inconnu";
  };

  const onSubmit = async () => {
    await createBikePiece({
      bike_id: bikeId.value,
      model_id: selectedModelId.value,
      name: name.value,
      reference: reference.value,
      price: price.value,
      maintenance_period_alert: maintenancePeriodAlert.value,
      stock: stock.value,
      stock_alert: stockAlert.value
    });

    alert("Pièce de moto ajoutée avec succès !");
  };
</script>
