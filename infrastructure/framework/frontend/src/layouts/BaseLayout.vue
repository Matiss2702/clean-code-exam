<script setup lang="ts">
import TheFooter from "@/domains/navigation/components/TheFooter.vue";
import TheNavbar from "@/domains/navigation/components/TheNavbar.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TheNavbar />
    <main class="flex-1 mx-3">
      <router-view></router-view>
    </main>
    <TheFooter />
  </div>
</template>
