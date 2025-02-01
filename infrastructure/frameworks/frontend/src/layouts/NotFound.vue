<template>
  <div class="flex flex-col items-center justify-center min-h-screen gap-4">
    <h1 class="font-bold text-7xl">404</h1>
    <p class="text-xl">Page non trouvée</p>
    <Button>
      <RouterLink to="/">Accueil</RouterLink>
    </Button>
  </div>
</template>

<script setup lang="ts">
  import { Button } from "@/components/ui/button";
</script>
