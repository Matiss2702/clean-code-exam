<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Ajouter un test de moto</span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Créer un Test de Moto</DialogTitle>
        <DialogDescription>
          Remplissez le formulaire ci-dessous pour ajouter un test de moto.
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
                  <CommandEmpty>Aucun utilisateur trouvé.</CommandEmpty>
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
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    class="justify-between w-full"
                    :class="!startedAt ? 'text-muted-foreground' : ''"
                  >
                    <span>
                      {{
                        startedAt
                          ? df.format(new Date(startedAt))
                          : "Sélectionner une date"
                      }}
                    </span>
                    <CalendarIcon class="w-4 h-4 ml-2 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar v-model="startedAt" />
              </PopoverContent>
            </Popover>
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
                @input="updatePrice"
                required
              />
            </FormControl>
          </FormItem>
        </FormField>

        <!-- Prix du Test (non modifiable) -->
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
    FormControl
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
  import { createBikeTest } from "@/services/bikeTestService";
  import { getAllBikes } from "@/services/bikeService";
  import { getAllUsers } from "@/services/userService";
  import { Calendar } from "@/components/ui/calendar";

  const df = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" });

  const bikeId = ref("");
  const userId = ref("");
  const startedAt = ref("");
  const days = ref(1);
  const price = ref<number>(0);
  const bikes = ref<{ id: string; plate_number: string; price: number }[]>([]);
  const users = ref<{ id: string; name: string }[]>([]);

  onMounted(async () => {
    try {
      const bikeResponse = await getAllBikes();
      bikes.value = bikeResponse;
      const userResponse = await getAllUsers();
      users.value = userResponse;
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  });

  const setBike = (id: string) => {
    bikeId.value = id;
    const selectedBike = bikes.value.find((b) => b.id === id);
    if (selectedBike) {
      price.value = selectedBike.price * days.value;
    }
  };

  const setUser = (id: string) => {
    userId.value = id;
  };

  const updatePrice = () => {
    const selectedBike = bikes.value.find((b) => b.id === bikeId.value);
    if (selectedBike) {
      price.value = selectedBike.price * days.value;
    }
  };

  const onSubmit = async () => {
    await createBikeTest({
      bike_id: bikeId.value,
      user_id: userId.value,
      started_at: startedAt.value,
      days: days.value,
      price: price.value
    });
    alert("Test de moto créé avec succès !");
  };
</script>
