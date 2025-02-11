<template>
  <div>
    <div v-if="route.params.link">
      <router-view />
    </div>
    <div v-else>
      <TheBreadcrumb :breadcrumbs="breadcrumbs" />

      <h1 class="text-5xl font-bold">Nos Motos</h1>
      <div
        v-if="models"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8"
      >
        <div
          v-for="model in models"
          :key="model.id"
        >
          <router-link :to="`/bike/${model.link}`">
            <Card class="w-full">
              <CardHeader>
                <CardTitle>{{ model.name }}</CardTitle>
              </CardHeader>
              <CardContent class="grid grid-cols-1 gap-8">
                <img
                  src="/image.svg"
                  alt="image"
                  class="invert dark:invert-0"
                />
                <router-link :to="`/bike/${model.link}`">
                  <Button class="w-full">Voir {{ model.name }}</Button>
                </router-link>
              </CardContent>
            </Card>
          </router-link>
        </div>
      </div>
      <div v-else>
        <p>Aucune moto n'a été trouvé</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";
  import { ref, onMounted } from "vue";
  import { getAllModels } from "@/services/modelService";
  import {
    Card,
    CardContent,
    CardTitle,
    CardHeader
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import TheBreadcrumb from "@/domains/navigation/components/TheBreadcrumb.vue";

  const breadcrumbs = ref<{ link: string; name: string }[]>([]);

  const models = ref<Model[]>([]);

  const route = useRoute();

  const fetchModels = async () => {
    try {
      const data = await getAllModels();
      models.value = data;

      breadcrumbs.value = [
        { link: "/", name: "Accueil" },
        { link: "/bike", name: "Nos Motos" }
      ];
    } catch (error) {
      console.error("Erreur lors de la récupération des modèles", error);
    }
  };

  onMounted(() => {
    fetchModels();
  });
</script>
