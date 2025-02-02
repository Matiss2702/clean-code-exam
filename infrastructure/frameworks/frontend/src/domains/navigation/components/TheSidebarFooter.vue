<template>
  <SidebarFooter>
    <div class="w-full flex items-center justify-center">
      <RouterLink
        to="/logout"
        class="grow flex items-center"
      >
        <Button
          variant="destructive"
          class="grow justify-between"
        >
          Se déconnecter
          <Power />
        </Button>
      </RouterLink>
    </div>
  </SidebarFooter>
</template>

<script setup lang="ts">
  import { Power } from "lucide-vue-next";
  import { Button } from "@/components/ui/button";
  import { SidebarFooter } from "@/components/ui/sidebar";
  import { RouterLink } from "vue-router";
</script>
