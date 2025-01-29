<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <main class="flex-1 p-4">
      <div class="container mx-auto">
        <router-view />
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
  import TheHeader from "@/domains/navigation/components/TheHeader.vue";
  import TheFooter from "@/domains/navigation/components/TheFooter.vue";
</script>
