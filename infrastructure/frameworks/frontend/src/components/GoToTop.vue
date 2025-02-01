<template>
  <div class="fixed bottom-4 right-4">
    <Button
      v-if="showGoToTop"
      @click="scrollToTop"
    >
      <ArrowUp class="h-6 w-6" />
      <span class="sr-only">Go to Top</span>
    </Button>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue";

  import { Button } from "@/components/ui/button";
  import { ArrowUp } from "lucide-vue-next";

  const showGoToTop = ref(false);

  const handleScroll = () => {
    showGoToTop.value = window.scrollY > 200;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
</script>
