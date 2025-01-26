<template>
  <SidebarContent>
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem
          v-for="route in filteredRoutes"
          :key="route.name"
        >
          <RouterLink
            :to="route.path"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <component
              :is="route.meta.icon"
              class="w-5 h-5"
            />
            {{ route.meta.title }}
          </RouterLink>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  </SidebarContent>
</template>

<script setup lang="ts">
  import { computed, defineProps } from "vue";
  import { useRouter, RouterLink } from "vue-router";
  import {
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarGroup
  } from "@/components/ui/sidebar";

  const props = defineProps<{ type: "admin" | "account" }>();

  const router = useRouter();

  const filteredRoutes = computed(() => {
    const allRoutes = router.getRoutes().map((route) => ({
      path: route.path,
      name: route.name,
      meta: route.meta
    }));

    return allRoutes
      .filter((route) => {
        const isValidParent =
          props.type === "admin"
            ? route.path.startsWith("/admin")
            : route.path.startsWith("/account");

        return isValidParent && route.meta?.title && route.meta?.icon;
      })
      .sort(
        (a, b) =>
          (Number(a.meta?.position) ?? 0) - (Number(b.meta?.position) ?? 0)
      );
  });
</script>
