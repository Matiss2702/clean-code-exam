<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <main class="flex-1 p-4 flex items-center content-center">
      <div class="container mx-auto">
        <router-view :type="pageTitle" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";
  import { computed } from "vue";
  import TheHeader from "@/domains/navigation/components/TheHeader.vue";

  const route = useRoute();

  const pageTitle = computed(() => route.meta.title || "Default Title");
</script>
