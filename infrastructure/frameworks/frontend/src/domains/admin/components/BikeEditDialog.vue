<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button
        class="flex items-center space-x-2"
        variant="outline"
      >
        <Edit class="w-4 h-4" />
        <span class="sr-only">Modifier</span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Modifier la Moto</DialogTitle>
        <DialogDescription>
          Modifiez les informations de la moto ci-dessous.
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
                        ? models.find((model) => model.id === modelId)?.name
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
            <FormControl>
              <Input
                type="date"
                v-model="formattedPurchaseDate"
                :min="minDate"
                :max="maxDate"
                required
              />
            </FormControl>
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
                v-model="mileage"
                placeholder="Ex. 15000"
                required
                type="number"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="plateNumber">
          <FormItem class="flex flex-col">
            <FormLabel>Plaque d'immatriculation</FormLabel>
            <FormControl>
              <Input
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
            Modifier
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
    FormControl
  } from "@/components/ui/form";
  import { Edit, Calendar as CalendarIcon } from "lucide-vue-next";
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
  import { updateBike } from "@/services/bikeService";
  import { getAllModels } from "@/services/modelService";
  import { getAllBikeStatuses } from "@/services/bikeStatusService";
  import {
    DateFormatter,
    CalendarDate,
    getLocalTimeZone,
    today
  } from "@internationalized/date";

  const df = new DateFormatter("fr-FR", { dateStyle: "long" });

  const formattedPurchaseDate = ref("");
  const minDate = "1900-01-01";
  const maxDate = new Date().toISOString().split("T")[0];

  const props = defineProps<{ bike: Bike }>();
  const serialNumber = ref(props.bike.serial_number);
  const mileage = ref(props.bike.mileage);
  const plateNumber = ref(props.bike.plate_number);
  const bikeStatusId = ref(props.bike.bike_status_id);
  const modelId = ref(props.bike.model_id);
  const models = ref<{ id: string; name: string }[]>([]);
  const bikeStatuses = ref<{ id: string; name: string }[]>([]);

  onMounted(() => {
    if (props.bike.purchase_date) {
      const parsedDate = new Date(props.bike.purchase_date);
      formattedPurchaseDate.value = parsedDate.toISOString().split("T")[0];
    }

    fetchModelsAndStatuses();
  });

  const fetchModelsAndStatuses = async () => {
    try {
      const modelResponse = await getAllModels();
      models.value = modelResponse;

      const statusResponse = await getAllBikeStatuses();
      bikeStatuses.value = statusResponse;
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const setBikeStatus = (id: string) => {
    bikeStatusId.value = id;
  };

  const setModel = (id: string) => {
    modelId.value = id;
  };

  const onSubmit = async () => {
    if (
      !formattedPurchaseDate.value ||
      !serialNumber.value ||
      !modelId.value ||
      !bikeStatusId.value ||
      !mileage.value ||
      !plateNumber.value ||
      !formattedPurchaseDate
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const id = props.bike.id;
    const data = {
      purchase_date: formattedPurchaseDate.value,
      mileage: mileage.value,
      plate_number: plateNumber.value,
      model_id: modelId.value,
      serial_number: serialNumber.value,
      bike_status_id: bikeStatusId.value
    };

    try {
      await updateBike(id, data);
      alert("Moto modifiée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la modification de la moto", error);
      alert("Erreur : Impossible de modifier la moto.");
    }
  };
</script>
