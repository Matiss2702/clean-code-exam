<template>
  <TheTopHeader v-if="showHeader" />
  <router-view />
  <Toaster />
  <GoToTop />
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import Toaster from "@/components/ui/toast/Toaster.vue";
  import GoToTop from "@/components/GoToTop.vue";
  import TheTopHeader from "@/domains/navigation/components/TheTopHeader.vue";

  const route = useRoute();
  const showHeader = computed(() => route.meta.showHeader ?? true);
</script>
