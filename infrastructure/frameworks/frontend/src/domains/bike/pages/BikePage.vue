<template>
  <div v-if="model && model.brand && model.bikeCategory">
    <TheBreadcrumb :breadcrumbs="breadcrumbs" />
    <div class="flex space-x-4">
      <img
        src="/image.svg"
        alt="image"
        class="invert dark:invert-0"
      />
      <div class="flex flex-col gap-6">
        <h1 class="text-5xl font-bold -mt-2">{{ model.name }}</h1>
        <div>
          <ul>
            <li>
              <span class="font-bold">Marque</span>
              :
              <span>{{ model.brand.name }}</span>
            </li>
            <li>
              <span class="font-bold">Catégorie</span>
              :
              <span>{{ model.bikeCategory.name }}</span>
            </li>
            <li>
              <span class="font-bold">Transmission</span>
              :
              <span>Boîte {{ model.transmission_type }}</span>
            </li>
            <li>
              <span class="font-bold">Places</span>
              :
              <span>{{ model.seat }}</span>
            </li>
            <li>
              <span class="font-bold">Top case</span>
              :
              <span>{{ model.top_case }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Chargement des informations du modèle...</p>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { getModelByLink } from "@/services/modelService";
  import { getBrandById } from "@/services/brandService";
  import { getBikeCategoryById } from "@/services/bikeCategoryService";
  import TheBreadcrumb from "@/domains/navigation/components/TheBreadcrumb.vue";

  const route = useRoute();
  const modelLink = route.params.link as string;

  const model = ref<Model | null>(null);
  const breadcrumbs = ref<{ link: string; name: string }[]>([]);

  const fetchModel = async () => {
    try {
      const modelData = await getModelByLink(modelLink);
      model.value = modelData;

      const brandData = await getBrandById(modelData.brand_id);
      model.value.brand = brandData;

      const bikeCategoryData = await getBikeCategoryById(
        modelData.bike_category_id
      );
      model.value.bikeCategory = bikeCategoryData;

      breadcrumbs.value = [
        { link: "/", name: "Accueil" },
        { link: "/bike", name: "Nos Motos" },
        { link: `/bike/${modelData.link}`, name: modelData.name }
      ];
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du modèle",
        error
      );
    }
  };

  onMounted(() => {
    fetchModel();
  });
</script>
