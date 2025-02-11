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
        <DialogTitle>Modifier le Test de Moto</DialogTitle>
        <DialogDescription>
          Modifiez les informations du test de moto ci-dessous.
        </DialogDescription>
      </DialogHeader>
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 gap-4 py-4"
      >
        <!-- Sélection de la Moto -->
        <FormField name="bike_id">
          <FormItem class="flex flex-col">
            <FormLabel>Moto</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    class="justify-between w-full"
                    :class="!bikeId ? 'text-muted-foreground' : ''"
                  >
                    {{
                      bikeId
                        ? bikes.find((b) => b.id === bikeId)?.plate_number
                        : "Sélectionner une moto"
                    }}
                    <ChevronsUpDown class="w-4 h-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Chercher une moto..." />
                  <CommandEmpty>Aucune moto trouvée.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="bike in bikes"
                        :key="bike.id"
                        :value="bike.id"
                        @select="() => setBike(bike.id)"
                      >
                        <Check
                          :class="
                            bikeId === bike.id ? 'opacity-100' : 'opacity-0'
                          "
                        />
                        {{ bike.plate_number }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        </FormField>

        <!-- Sélection de l'Utilisateur -->
        <FormField name="user_id">
          <FormItem class="flex flex-col">
            <FormLabel>Utilisateur</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    class="justify-between w-full"
                    :class="!userId ? 'text-muted-foreground' : ''"
                  >
                    {{
                      userId
                        ? users.find((u) => u.id === userId)?.name
                        : "Sélectionner un utilisateur"
                    }}
                    <ChevronsUpDown class="w-4 h-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Chercher un utilisateur..." />
                  <CommandEmpty>Aucune utilisateur trouvé.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="user in users"
                        :key="user.id"
                        :value="user.id"
                        @select="() => setUser(user.id)"
                      >
                        <Check
                          :class="
                            userId === user.id ? 'opacity-100' : 'opacity-0'
                          "
                        />
                        {{ user.name }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        </FormField>

        <!-- Date de Début du Test -->
        <FormField name="started_at">
          <FormItem class="flex flex-col">
            <FormLabel>Date de début</FormLabel>
            <FormControl>
              <Input
                type="date"
                v-model="formattedStartedAt"
                required
              />
            </FormControl>
          </FormItem>
        </FormField>

        <!-- Nombre de jours -->
        <FormField name="days">
          <FormItem class="flex flex-col">
            <FormLabel>Nombre de jours</FormLabel>
            <FormControl>
              <Input
                v-model="days"
                type="number"
                min="1"
                placeholder="Ex. 1"
                @input="updatePriceAndEndDate"
                required
              />
            </FormControl>
          </FormItem>
        </FormField>

        <!-- Date de Fin du Test (Calculée automatiquement) -->
        <FormField name="ended_at">
          <FormItem class="flex flex-col">
            <FormLabel>Date de fin</FormLabel>
            <FormControl>
              <Input
                type="date"
                v-model="formattedEndedAt"
                readonly
              />
            </FormControl>
          </FormItem>
        </FormField>

        <!-- Prix du Test (Calculé automatiquement) -->
        <FormField name="price">
          <FormItem class="flex flex-col">
            <FormLabel>Prix Total</FormLabel>
            <FormControl>
              <Input
                v-model="price"
                type="number"
                readonly
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
  import { ref, onMounted, watch } from "vue";
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
  import { updateBikeTest } from "@/services/bikeTestService";
  import { getAllBikes } from "@/services/bikeService";
  import { getAllUsers } from "@/services/userService";

  const props = defineProps<{ bikeTest: any }>();

  const formattedStartedAt = ref("");
  const formattedEndedAt = ref("");
  const bikeId = ref(props.bikeTest.bike_id);
  const userId = ref(props.bikeTest.user_id);
  const days = ref(1);
  const price = ref(props.bikeTest.price);
  const bikes = ref<{ id: string; plate_number: string; price: number }[]>([]);
  const users = ref<{ id: string; name: string }[]>([]);

  // Fonction pour calculer la différence en jours entre deux dates
  const calculateDaysDifference = (startDate: Date, endDate: Date): number => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Fonction pour calculer la date de fin
  const calculateEndDate = (startDate: string, days: number): string => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };

  // Mettre à jour la date de fin et le prix
  const updatePriceAndEndDate = () => {
    if (formattedStartedAt.value && days.value) {
      formattedEndedAt.value = calculateEndDate(
        formattedStartedAt.value,
        days.value
      );
    }
    const selectedBike = bikes.value.find((b) => b.id === bikeId.value);
    if (selectedBike) {
      price.value = selectedBike.price * days.value;
    }
  };

  // Initialisation des données
  onMounted(async () => {
    if (props.bikeTest.started_at && props.bikeTest.ended_at) {
      const startDate = new Date(props.bikeTest.started_at);
      const endDate = new Date(props.bikeTest.ended_at);
      days.value = calculateDaysDifference(startDate, endDate);
      formattedStartedAt.value = startDate.toISOString().split("T")[0];
      formattedEndedAt.value = endDate.toISOString().split("T")[0];
    }

    await fetchBikesAndUsers();
  });

  // Récupérer les motos et les utilisateurs
  const fetchBikesAndUsers = async () => {
    try {
      const bikeResponse = await getAllBikes();
      bikes.value = bikeResponse;

      const userResponse = await getAllUsers();
      users.value = userResponse;
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  // Sélectionner une moto
  const setBike = (id: string) => {
    bikeId.value = id;
    updatePriceAndEndDate();
  };

  // Sélectionner un utilisateur
  const setUser = (id: string) => {
    userId.value = id;
  };

  // Soumission du formulaire
  const onSubmit = async () => {
    await updateBikeTest(props.bikeTest.id, {
      bike_id: bikeId.value,
      user_id: userId.value,
      started_at: formattedStartedAt.value,
      ended_at: formattedEndedAt.value,
      days: days.value,
      price: price.value
    });

    alert("Test de moto modifié avec succès !");
  };

  watch([formattedStartedAt, days], () => {
    updatePriceAndEndDate();
  });
</script>
