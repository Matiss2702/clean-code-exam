<template>
  <div>
    <div v-if="route.params.link">
      <router-view />
    </div>
    <div v-else>
      <TheBreadcrumb :breadcrumbs="breadcrumbs" />

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
  import TheBreadcrumb from "@/domains/navigation/components/TheBreadcrumb.vue";

  const brands = ref<Brand[]>([]);
  const breadcrumbs = ref<{ link: string; name: string }[]>([]);

  const route = useRoute();

  const fetchBrands = async () => {
    try {
      const data = await getAllBrands();
      brands.value = data;

      breadcrumbs.value = [
        { link: "/", name: "Accueil" },
        { link: "/brand", name: "Nos Marques" }
      ];
    } catch (error) {
      console.error("Erreur lors de la récupération des marques", error);
    }
  };

  onMounted(() => {
    fetchBrands();
  });
</script>
