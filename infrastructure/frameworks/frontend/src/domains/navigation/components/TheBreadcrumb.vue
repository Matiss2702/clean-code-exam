<script setup lang="ts">
  import { defineProps } from "vue";
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage
  } from "@/components/ui/breadcrumb";
  import { ChevronRight } from "lucide-vue-next";

  const props = defineProps<{
    breadcrumbs: { link: string; name: string }[];
  }>();
</script>

<template>
  <Breadcrumb class="mb-4">
    <BreadcrumbList>
      <BreadcrumbItem
        v-for="(breadcrumb, index) in props.breadcrumbs"
        :key="index"
      >
        <BreadcrumbLink
          as-child
          v-if="index < props.breadcrumbs.length - 1"
        >
          <router-link :to="breadcrumb.link">
            {{ breadcrumb.name }}
          </router-link>
        </BreadcrumbLink>

        <BreadcrumbItem
          as-child
          v-else
        >
          <BreadcrumbPage>
            <span class="font-bold">{{ breadcrumb.name }}</span>
          </BreadcrumbPage>
        </BreadcrumbItem>

        <BreadcrumbSeparator v-if="index < props.breadcrumbs.length - 1">
          <ChevronRight />
        </BreadcrumbSeparator>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
