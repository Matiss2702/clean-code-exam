<template>
  <Card class="max-w-[300px] md:max-w-[550px] mx-auto relative">
    <div>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <RouterLink
            to="/"
            title="Retour à l'accueil"
          >
            <Button variant="outline">
              <ArrowLeft />
            </Button>
          </RouterLink>
          <span>
            {{ title === "Se connecter" ? "Se connecter à" : "S'inscrire sur" }}
          </span>
          <span>Triumph Motorcycles</span>
        </CardTitle>
      </CardHeader>
      <FormComponent :type="title" />
    </div>
  </Card>
</template>

<script setup lang="ts">
  import { defineProps } from "vue";
  import FormComponent from "@/domains/auth/components/FormComponent.vue";
  import { Card, CardHeader, CardTitle } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { RouterLink } from "vue-router";
  import { ArrowLeft } from "lucide-vue-next";

  defineProps<{ title: "Se connecter" | "S'inscrire" }>();
</script>
