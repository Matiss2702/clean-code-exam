<template>
  <div id="app">
    <router-view />
    <Toaster />
  </div>
</template>

<script setup>
import Toaster from "./components/ui/toast/Toaster.vue";
</script>