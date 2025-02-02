<template>
  <header
    class="sticky top-0 z-10 p-4 border-b bg-background/75 backdrop-blur-md"
  >
    <div class="container mx-auto">
      <nav class="flex items-center justify-between">
        <!-- Logo -->
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

        <!-- Actions -->
        <ul class="flex items-center space-x-4 h-[40px]">
          <li v-if="!authStore.token">
            <!-- Bouton Se connecter si non connecté -->
            <RouterLink to="/auth/login">
              <Button variant="outline">
                Se connecter
                <User class="w-6 h-6 ml-2" />
              </Button>
            </RouterLink>
          </li>
          <li
            v-else
            class="relative"
          >
            <!-- Menu déroulant pour l'utilisateur connecté -->
            <button
              @click="toggleMenu"
              class="flex items-center space-x-2"
            >
              <User
                class="w-8 h-8 p-1 bg-gray-200 rounded-full dark:bg-gray-700"
              />
            </button>
            <div
              v-if="menuOpen"
              class="absolute right-0 w-48 mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800"
            >
              <ul class="p-2">
                <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <RouterLink to="/account/profile">Mon Profil</RouterLink>
                </li>
                <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <button @click="logout">Déconnexion</button>
                </li>
              </ul>
            </div>
          </li>

          <!-- Bouton Louer une moto -->
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
  import { ref } from "vue";
  import { useAuthStore } from "@/stores/authStore";
  import { Button } from "@/components/ui/button";
  import { Separator } from "@/components/ui/separator";
  import { User, Bike } from "lucide-vue-next";
  import ThemePopover from "@/components/ThemePopover.vue";
  import { useRouter } from "vue-router";

  const authStore = useAuthStore();
  const router = useRouter();
  const menuOpen = ref(false);

  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  };

  const logout = () => {
    authStore.logout();
    menuOpen.value = false;
    router.push("/auth/login");
  };
</script>
