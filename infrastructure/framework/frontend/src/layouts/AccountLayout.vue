<template>
  <SidebarProvider id="sidebar">
    <Sidebar>
      <TheSidebarHeader />
      <TheSidebarContent type="account" />
      <TheSidebarFooter />
    </Sidebar>
    <SidebarInset>
      <TheSidebarTopHeader />
      <main class="flex flex-col flex-1 gap-4 p-8">
        <router-view />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import { manageSidebar } from "@/lib/sidebar";
  import TheSidebarHeader from "@/domains/navigation/components/TheSidebarHeader.vue";
  import TheSidebarFooter from "@/domains/navigation/components/TheSidebarFooter.vue";
  import TheSidebarContent from "@/domains/navigation/components/TheSidebarContent.vue";
  import TheSidebarTopHeader from "@/domains/navigation/components/TheSidebarTopHeader.vue";
  import {
    Sidebar,
    SidebarInset,
    SidebarProvider
  } from "@/components/ui/sidebar";

  onMounted(() => {
    manageSidebar();
  });
</script>
