<template>
  <Popover>
    <PopoverTrigger as="Button">
      <component :is="currentIcon" />
    </PopoverTrigger>
    <PopoverContent class="p-1 flex flex-col mt-8 items-start w-auto">
      <Button
        variant="ghost"
        @click="setTheme('light')"
        :class="{ 'text-blue-500': theme === 'light' }"
        class="w-full flex items-center justify-start gap-2"
      >
        <Sun />
        Clair
      </Button>
      <Button
        variant="ghost"
        @click="setTheme('dark')"
        :class="{ 'text-blue-500': theme === 'dark' }"
        class="w-full flex items-center justify-start gap-2"
      >
        <Moon />
        Sombre
      </Button>
      <Button
        variant="ghost"
        @click="setTheme('device')"
        :class="{ 'text-blue-500': theme === 'device' }"
        class="w-full flex items-center justify-start gap-2"
      >
        <Monitor />
        Par défaut
      </Button>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
  import { onMounted, ref, computed } from "vue";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger
  } from "@/components/ui/popover";
  import { Button } from "@/components/ui/button";
  import { Palette, Sun, Moon, Monitor } from "lucide-vue-next";

  const theme = ref<string>("device");

  const currentIcon = computed(() => {
    if (theme.value === "light") return Sun;
    if (theme.value === "dark") return Moon;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? Moon
      : Sun;
  });

  const setTheme = (newTheme: string) => {
    theme.value = newTheme;
    const root = document.documentElement;

    root.classList.remove("dark");

    if (newTheme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (newTheme === "light") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "device");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      }
    }
  };

  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    if (theme.value === "device") {
      const root = document.documentElement;
      if (e.matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setTheme("dark");
    } else if (savedTheme === "light") {
      setTheme("light");
    } else {
      setTheme("device");
    }

    const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    systemThemeQuery.addEventListener("change", handleSystemThemeChange);
  });
</script>
