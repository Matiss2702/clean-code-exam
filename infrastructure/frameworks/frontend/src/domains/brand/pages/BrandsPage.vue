<template>
  <div>
    <div v-if="route.params.link">
      <router-view />
    </div>
    <div v-else>
      <div class="mb-8 flex flex-col md:flex-row items-center gap-2">
        <router-link to="/">Accueil</router-link>
        <span>></span>
        <span class="font-bold">Nos Marques</span>
      </div>
      <h1 class="text-5xl font-bold">Nos Marques</h1>
      <div
        v-if="brands"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8"
      >
        <div
          v-for="brand in brands"
          :key="brand.id"
        >
          <router-link :to="`/brand/${brand.link}`">
            <Card class="w-full">
              <CardHeader>
                <CardTitle>{{ brand.name }}</CardTitle>
              </CardHeader>
              <CardContent class="grid grid-cols-1 gap-8">
                <img
                  src="/image.svg"
                  alt="image"
                  class="invert dark:invert-0"
                />
                <router-link :to="`/brand/${brand.link}`">
                  <Button class="w-full">Voir {{ brand.name }}</Button>
                </router-link>
              </CardContent>
            </Card>
          </router-link>
        </div>
      </div>
      <div v-else>
        <p>Aucune marque n'a été trouvée</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";
  import { ref, onMounted } from "vue";
  import { getAllBrands } from "@/services/brandService";
  import {
    Card,
    CardContent,
    CardTitle,
    CardHeader
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";

  const brands = ref<Brand[]>([]);

  console.log("brands", brands);
  const route = useRoute();
  console.log("route.params", route.params);
  const fetchBrands = async () => {
    try {
      const data = await getAllBrands();
      brands.value = data;
    } catch (error) {
      console.error("Erreur lors de la récupération des marques", error);
    }
  };

  onMounted(() => {
    fetchBrands();
  });
</script>
