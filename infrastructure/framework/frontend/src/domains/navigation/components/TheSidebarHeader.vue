<template>
  <SidebarHeader class="border-b p-0 h-[64px] flex items-center justify-center">
    <RouterLink
      to="/"
      class="grow w-full flex items-center justify-center"
      title="Retour à l'accueil"
    >
      <img
        src="/logo.svg"
        alt="logo"
        class="invert dark:invert-0"
      />
      <span class="sr-only">Triumph Motorcycles</span>
    </RouterLink>
  </SidebarHeader>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";
  import { onMounted, onBeforeUnmount } from "vue";
  import { manageSidebar } from "@/lib/sidebar";
  import { SidebarHeader } from "@/components/ui/sidebar";

  let cleanupSidebar: (() => void) | null = null;

  onMounted(() => {
    cleanupSidebar = manageSidebar();
  });

  onBeforeUnmount(() => {
    if (cleanupSidebar) {
      cleanupSidebar();
    }
  });
</script>
