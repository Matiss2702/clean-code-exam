<template>
  <TheBreadcrumb :breadcrumbs="breadcrumbs" />
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
  import TheBreadcrumb from "@/domains/navigation/components/TheBreadcrumb.vue";

  const route = useRoute();
  const brandLink = route.params.link as string;

  const brand = ref<Brand | null>(null);
  const breadcrumbs = ref<{ link: string; name: string }[]>([]);

  const fetchBrand = async () => {
    try {
      const data = await getBrandByLink(brandLink);
      brand.value = data;

      breadcrumbs.value = [
        { link: "/", name: "Accueil" },
        { link: "/brand", name: "Nos Marques" },
        { link: `/brand/${brandLink}`, name: brand.value.name }
      ];
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
