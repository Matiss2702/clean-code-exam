<template>
  <div class="mb-8 flex flex-col md:flex-row items-center gap-2">
    <router-link to="/">Accueil</router-link>
    <span>></span>
    <router-link to="/brand">Nos Marques</router-link>
    <span>></span>
    <span class="font-bold">{{ brand?.name }}</span>
  </div>
  <div>
    <div class="flex space-x-4">
      <img
        src="/image.svg"
        alt="image"
        class="invert dark:invert-0"
      />
      <div class="flex flex-col gap-6">
        <h1 class="text-5xl font-bold -mt-2">{{ brand?.name }}</h1>
        <div>
          <p>{{ brand?.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { getBrandByLink } from "@/services/brandService";

  const route = useRoute();
  const brandLink = route.params.link as string;

  const brand = ref<Brand | null>(null);

  const fetchBrand = async () => {
    try {
      const data = await getBrandByLink(brandLink);
      brand.value = data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de la marque",
        error
      );
    }
  };

  onMounted(() => {
    fetchBrand();
  });
</script>
