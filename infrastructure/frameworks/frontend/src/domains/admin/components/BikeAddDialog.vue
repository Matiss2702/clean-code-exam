<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Ajouter une moto</span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Créer une Moto</DialogTitle>
        <DialogDescription>
          Remplissez le formulaire ci-dessous pour ajouter une nouvelle moto.
        </DialogDescription>
      </DialogHeader>
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 gap-4 py-4"
      >
        <FormField name="model_id">
          <FormItem class="flex flex-col">
            <FormLabel>Modèle</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    class="w-full justify-between"
                    :class="!modelId ? 'text-muted-foreground' : ''"
                  >
                    {{
                      modelId
                        ? models.find((m) => m.id === modelId)?.name
                        : "Sélectionner un modèle"
                    }}
                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Chercher un modèle..." />
                  <CommandEmpty>Aucun modèle trouvé.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="model in models"
                        :key="model.id"
                        :value="model.id"
                        @select="() => setModel(model.id)"
                      >
                        <Check
                          :class="
                            modelId === model.id ? 'opacity-100' : 'opacity-0'
                          "
                        />
                        {{ model.name }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        </FormField>

        <FormField name="purchase_date">
          <FormItem class="flex flex-col">
            <FormLabel>Date d'achat</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    class="w-full justify-between"
                    :class="!purchaseDate ? 'text-muted-foreground' : ''"
                  >
                    <span>
                      {{
                        purchaseDate
                          ? df.format(
                              new Date(
                                purchaseDate.year,
                                purchaseDate.month - 1,
                                purchaseDate.day
                              )
                            )
                          : "Sélectionner une date"
                      }}
                    </span>
                    <CalendarIcon class="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar
                  v-model="purchaseDate"
                  :min-value="new CalendarDate(1900, 1, 1)"
                  :max-value="today(getLocalTimeZone())"
                  @update:model-value="
                    (newPurchaseDate) => {
                      purchaseDate = newPurchaseDate
                        ? newPurchaseDate
                        : undefined;
                    }
                  "
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Choisissez la date d'achat de la moto.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="bike_status_id">
          <FormItem class="flex flex-col">
            <FormLabel>Statut de la Moto</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    class="w-full justify-between"
                    :class="!bikeStatusId ? 'text-muted-foreground' : ''"
                  >
                    {{
                      bikeStatusId
                        ? bikeStatuses.find(
                            (bikeStatus) => bikeStatus.id === bikeStatusId
                          )?.name
                        : "Sélectionner un statut"
                    }}
                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Chercher un statut..." />
                  <CommandEmpty>Aucun statut trouvé.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="status in bikeStatuses"
                        :key="status.id"
                        :value="status.id"
                        @select="() => setBikeStatus(status.id)"
                      >
                        <Check
                          :class="
                            bikeStatusId === status.id
                              ? 'opacity-100'
                              : 'opacity-0'
                          "
                        />
                        {{ status.name }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        </FormField>

        <FormField name="serial_number">
          <FormItem class="flex flex-col">
            <FormLabel>Numéro de série</FormLabel>
            <FormControl>
              <Input
                v-model="serialNumber"
                placeholder="Entrez le numéro de série"
                required
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="mileage">
          <FormItem class="flex flex-col">
            <FormLabel>Kilométrage</FormLabel>
            <FormControl>
              <Input
                type="number"
                v-model="mileage"
                placeholder="Ex. 15000"
                required
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="plateNumber">
          <FormItem class="flex flex-col">
            <FormLabel>Plaque d'immatriculation</FormLabel>
            <FormControl>
              <Input
                type="string"
                v-model="plateNumber"
                placeholder="Ex. AA-000-88"
                required
              />
            </FormControl>
          </FormItem>
        </FormField>

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
  import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage
  } from "@/components/ui/form";
  import { Plus, Calendar as CalendarIcon } from "lucide-vue-next";
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
  import { Check, ChevronsUpDown } from "lucide-vue-next";
  import { createBike } from "@/services/bikeService";
  import { getAllModels } from "@/services/modelService";
  import { getAllBikeStatuses } from "@/services/bikeStatusService";
  import {
    CalendarDate,
    DateFormatter,
    getLocalTimeZone,
    today
  } from "@internationalized/date";
  import { Calendar } from "@/components/ui/calendar";

  const df = new DateFormatter("fr-FR", { dateStyle: "long" });

  const purchaseDate = ref<CalendarDate | undefined>(undefined);
  const serialNumber = ref("");
  const mileage = ref(0);
  const plateNumber = ref("");
  const bikeStatusId = ref("");
  const modelId = ref("");
  const models = ref<{ id: string; name: string }[]>([]);
  const bikeStatuses = ref<{ id: string; name: string }[]>([]);

  onMounted(async () => {
    try {
      const modelResponse = await getAllModels();
      models.value = modelResponse;

      const statusResponse = await getAllBikeStatuses();
      bikeStatuses.value = statusResponse;
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  });

  const setModel = (id: string) => {
    modelId.value = id;
  };

  const setBikeStatus = (id: string) => {
    bikeStatusId.value = id;
  };

  const onSubmit = async () => {
    if (
      !purchaseDate.value ||
      !serialNumber.value ||
      !modelId.value ||
      !bikeStatusId.value ||
      !mileage.value ||
      !plateNumber.value
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    try {
      await createBike({
        purchase_date: purchaseDate.value.toString(),
        serial_number: serialNumber.value,
        mileage: mileage.value,
        plate_number: plateNumber.value,
        production_bike_id: null,
        bike_status_id: bikeStatusId.value,
        model_id: modelId.value
      });
      alert("Moto créée avec succès !");
      purchaseDate.value = undefined;
      serialNumber.value = "";
      mileage.value = 0;
      plateNumber.value = "";
      bikeStatusId.value = "";
      modelId.value = "";
    } catch (error) {
      console.error("Erreur lors de la création de la moto", error);
      alert("Erreur : Impossible de créer la moto.");
    }
  };
</script>
