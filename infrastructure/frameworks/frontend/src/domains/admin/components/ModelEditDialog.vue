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
        <DialogTitle>Modifier le modèle</DialogTitle>
        <DialogDescription>
          Modifiez les informations du modèle ci-dessous.
        </DialogDescription>
      </DialogHeader>
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 gap-4 py-4"
      >
        <FormField name="brand_id">
          <FormItem class="flex flex-col">
            <FormLabel>Marque</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    class="w-full justify-between"
                    :class="!brandId ? 'text-muted-foreground' : ''"
                  >
                    {{
                      brandId
                        ? brands.find((b) => b.id === brandId)?.name
                        : "Sélectionner une marque"
                    }}
                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Chercher une marque..." />
                  <CommandEmpty>Aucune marque trouvée.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="brand in brands"
                        :key="brand.id"
                        :value="brand.id"
                        @select="() => setBrand(brand.id)"
                      >
                        <Check
                          :class="
                            brandId === brand.id ? 'opacity-100' : 'opacity-0'
                          "
                        />
                        {{ brand.name }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        </FormField>

        <FormField name="bike_category_id">
          <FormItem class="flex flex-col">
            <FormLabel>Catégorie de Moto</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    class="w-full justify-between"
                    :class="!bikeCategoryId ? 'text-muted-foreground' : ''"
                  >
                    {{
                      bikeCategoryId
                        ? bikeCategories.find(
                            (bikeCategory) => bikeCategory.id === bikeCategoryId
                          )?.name
                        : "Sélectionner une catégorie"
                    }}
                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Chercher une catégorie..." />
                  <CommandEmpty>Aucune catégorie trouvée.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="category in bikeCategories"
                        :key="category.id"
                        :value="category.id"
                        @select="() => setBikeCategory(category.id)"
                      >
                        <Check
                          :class="
                            bikeCategoryId === category.id
                              ? 'opacity-100'
                              : 'opacity-0'
                          "
                        />
                        {{ category.name }}
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
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input
                id="name"
                v-model="modelName"
                placeholder="Entrez le nom du modèle"
                required
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="maintenance_mileage_alert">
          <FormItem class="flex flex-col">
            <FormLabel>Alerte Kilométrage Entretien (en mois)</FormLabel>
            <FormControl>
              <Input
                id="maintenance_mileage_alert"
                type="number"
                v-model="maintenanceMileageAlert"
                placeholder="Ex. 10000"
                required
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="maintenance_period_alert">
          <FormItem class="flex flex-col">
            <FormLabel>Alerte Période Entretien</FormLabel>
            <FormControl>
              <Input
                id="maintenance_period_alert"
                type="number"
                v-model="maintenancePeriodAlert"
                placeholder="Ex. 12 mois"
                required
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="top_case">
          <FormItem class="flex flex-col">
            <FormLabel>Top Case</FormLabel>
            <FormControl>
              <Input
                id="top_case"
                type="number"
                v-model="topCase"
                placeholder="Ex. 1"
                min="0"
                max="5"
                required
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="seat">
          <FormItem class="flex flex-col">
            <FormLabel>Siège</FormLabel>
            <FormControl>
              <Input
                id="seat"
                type="number"
                v-model="seat"
                placeholder="Ex. 2"
                required
                min="2"
                max="3"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="transmission_type">
          <FormItem class="flex flex-col">
            <FormLabel>Type de Transmission</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    class="w-full justify-between"
                    :class="!transmissionType ? 'text-muted-foreground' : ''"
                  >
                    {{
                      transmissionType
                        ? transmissionType
                        : "Sélectionner une transmission"
                    }}
                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Chercher une transmission..." />
                  <CommandEmpty>Aucune transmission trouvée.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="(option, index) in [
                          'Manuelle',
                          'Automatique',
                          'Semi-Automatique'
                        ]"
                        :key="index"
                        :value="option"
                        @select="() => setTransmission(option)"
                      >
                        <Check
                          :class="
                            transmissionType === option
                              ? 'opacity-100'
                              : 'opacity-0'
                          "
                        />
                        {{ option }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
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
  import { Edit } from "lucide-vue-next";
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
  import { updateModel } from "@/services/modelService";
  import { getAllBrands } from "@/services/brandService";
  import { getAllBikeCategories } from "@/services/bikeCategoryService";

  const props = defineProps<{ model: Model }>();
  const modelName = ref(props.model.name);
  const maintenanceMileageAlert = ref(props.model.maintenance_mileage_alert);
  const maintenancePeriodAlert = ref(props.model.maintenance_period_alert);
  const topCase = ref(props.model.top_case);
  const seat = ref(props.model.seat);
  const transmissionType = ref(props.model.transmission_type);
  const brandId = ref(props.model.brand_id);
  const bikeCategoryId = ref(props.model.bike_category_id);

  const brands = ref<{ id: string; name: string }[]>([]);
  const bikeCategories = ref<{ id: string; name: string }[]>([]);

  onMounted(async () => {
    try {
      const brandResponse = await getAllBrands();
      brands.value = brandResponse;

      const categoryResponse = await getAllBikeCategories();
      bikeCategories.value = categoryResponse;
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  });

  const setBrand = (id: string) => {
    brandId.value = id;
  };

  const setBikeCategory = (id: string) => {
    bikeCategoryId.value = id;
  };

  const setTransmission = (option: string) => {
    transmissionType.value = option;
  };

  const onSubmit = async () => {
    if (!modelName.value || !brandId.value || !bikeCategoryId.value) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const id = props.model.id;
    const data = {
      name: modelName.value,
      maintenance_mileage_alert: maintenanceMileageAlert.value,
      maintenance_period_alert: maintenancePeriodAlert.value,
      top_case: topCase.value,
      seat: seat.value,
      transmission_type: transmissionType.value,
      brand_id: brandId.value,
      bike_category_id: bikeCategoryId.value
    };

    try {
      await updateModel(id, data);
      alert("Modèle modifié avec succès !");
    } catch (error) {
      console.error("Erreur lors de la modification du modèle", error);
      alert("Erreur : Impossible de modifier le modèle.");
    }
  };
</script>
