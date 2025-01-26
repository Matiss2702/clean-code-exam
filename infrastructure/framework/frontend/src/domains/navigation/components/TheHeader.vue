<template>
  <header
    class="p-4 border-b sticky top-0 z-10 bg-background/75 backdrop-blur-md"
  >
    <div class="container mx-auto">
      <nav class="flex items-center justify-between">
        <ul>
          <li>
            <RouterLink to="/">
              <img
                src="/logo.svg"
                alt="logo"
                class="invert dark:invert-0"
              />
              <span class="sr-only">Triumph Motorcycles</span>
            </RouterLink>
          </li>
        </ul>
        <ul class="flex items-center space-x-4 h-[40px]">
          <li>
            <RouterLink to="/auth/login">
              <Button variant="outline">
                Se connecter
                <User class="w-6 h-6 ml-2" />
              </Button>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/rent">
              <Button>
                Louer une moto
                <Bike class="w-6 h-6 ml-2" />
              </Button>
            </RouterLink>
          </li>
          <Separator orientation="vertical" />
          <ThemePopover />
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { Button } from "@/components/ui/button";
  import { Separator } from "@/components/ui/separator";
  import { User, Bike } from "lucide-vue-next";
  import ThemePopover from "@/components/ThemePopover.vue";
</script>
