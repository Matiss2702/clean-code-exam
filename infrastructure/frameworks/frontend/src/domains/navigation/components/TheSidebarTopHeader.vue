<template>
  <header
    class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b sticky top-0 z-10 bg-background/75 backdrop-blur-md"
  >
    <div class="flex items-center w-full px-4">
      <SidebarTrigger class="-ml-1" />
      <nav class="w-full flex items-center justify-between h-[40px] px-4">
        <Separator orientation="vertical" />
        <div class="flex items-center justify-end w-full px-4">
          <ul class="flex items-center">
            <li>
              <RouterLink to="/">
                <Button
                  variant="ghost"
                  class="flex items-center gap-2"
                >
                  <House class="w-6 h-6" />
                  Accueil
                </Button>
              </RouterLink>
            </li>
          </ul>
        </div>
        <Separator orientation="vertical" />
      </nav>
      <ThemePopover />
    </div>
  </header>
</template>

<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import ThemePopover from "@/components/ThemePopover.vue";
  import { House } from "lucide-vue-next";
  import { Button } from "@/components/ui/button";
  import { Separator } from "@/components/ui/separator";
  import { SidebarTrigger } from "@/components/ui/sidebar";
</script>
