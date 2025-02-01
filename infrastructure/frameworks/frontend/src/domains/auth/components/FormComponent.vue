<template>
  <form @submit.prevent="onSubmit">
    <CardContent>
      <!-- FORMULAIRE CONNEXION -->
      <div
        v-if="type === 'Se connecter'"
        class="grid grid-cols-1 gap-6"
      >
        <FormField
          v-slot="{ field }"
          name="email"
        >
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                v-bind="field"
                type="email"
                placeholder="Entrez votre email"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ field }"
          name="password"
        >
          <FormItem>
            <FormLabel>Mot de passe</FormLabel>
            <FormControl>
              <Input
                v-bind="field"
                type="password"
                placeholder="Entrez votre mot de passe"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <!-- FORMULAIRE INSCRIPTION -->
      <div
        v-else
        class="grid grid-cols-1 gap-6"
      >
        <FormField
          v-slot="{ field }"
          name="firstName"
        >
          <FormItem>
            <FormLabel>Prénom</FormLabel>
            <FormControl>
              <Input
                v-bind="field"
                type="text"
                placeholder="Entrez votre prénom"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ field }"
          name="lastName"
        >
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input
                v-bind="field"
                type="text"
                placeholder="Entrez votre nom"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ field }"
          name="email"
        >
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                v-bind="field"
                type="email"
                placeholder="Entrez votre email"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ field }"
          name="password"
        >
          <FormItem>
            <FormLabel>Mot de passe</FormLabel>
            <FormControl>
              <Input
                v-bind="field"
                type="password"
                placeholder="Entrez votre mot de passe"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ field }"
          name="confirmPassword"
        >
          <FormItem>
            <FormLabel>Confirmez le mot de passe</FormLabel>
            <FormControl>
              <Input
                v-bind="field"
                type="password"
                placeholder="Confirmez votre mot de passe"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ field }"
          name="termsAccepted"
        >
          <FormItem>
            <div class="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  v-bind="field"
                  :checked="field.value"
                  @click="field.onChange(!field.value)"
                />
              </FormControl>
              <label>
                J'accepte les
                <RouterLink
                  to="#"
                  class="font-bold hover:underline"
                >
                  conditions d'utilisation
                </RouterLink>
                et la
                <RouterLink
                  to="#"
                  class="font-bold hover:underline"
                >
                  politique de confidentialité
                </RouterLink>
                .
              </label>
            </div>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </CardContent>

    <CardFooter class="grid grid-cols-1 gap-4">
      <Button
        type="submit"
        class="w-full"
        :disabled="loading"
      >
        {{ loading ? "Chargement..." : type }}
      </Button>
      <Separator label="Ou" />
      <div v-if="type === 'Se connecter'">
        <span>Pas encore de compte ?</span>
        <RouterLink
          to="/auth/register"
          class="font-bold hover:underline"
        >
          S'inscrire
        </RouterLink>
      </div>
      <div v-else>
        <span>Déjà un compte ?</span>
        <RouterLink
          to="/auth/login"
          class="font-bold hover:underline"
        >
          Se connecter
        </RouterLink>
      </div>
    </CardFooter>
  </form>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { RouterLink, useRouter } from "vue-router";
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { useAuthStore } from "../../../stores/authStore";
  import { register, login } from "../../../services/authService";

  import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from "@/components/ui/form";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Separator } from "@/components/ui/separator";
  import { CardContent, CardFooter } from "@/components/ui/card";
  import { Checkbox } from "@/components/ui/checkbox";

  const props = defineProps<{ type: "Se connecter" | "S'inscrire" }>();
  const router = useRouter();
  const authStore = useAuthStore();
  const loading = ref(false);

  // Schéma de validation conditionnel selon le type
  const schema = z
    .object({
      firstName: z
        .string()
        .min(2, "Le prénom doit contenir au moins 2 caractères")
        .optional(),
      lastName: z
        .string()
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .optional(),
      email: z.string().email("Adresse email invalide"),
      password: z
        .string()
        .min(12, "Le mot de passe doit contenir au moins 12 caractères"),
      confirmPassword: z
        .string()
        .min(12, "La confirmation du mot de passe est requise")
        .optional(),
      termsAccepted:
        props.type === "S'inscrire"
          ? z
              .boolean()
              .default(false)
              .refine((val) => val === true, {
                message: "Vous devez accepter les conditions d'utilisation"
              })
          : z.boolean().optional()
    })
    .refine(
      (data) => {
        if (
          props.type === "S'inscrire" &&
          data.confirmPassword !== data.password
        ) {
          return false;
        }
        return true;
      },
      {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"]
      }
    );

  const initialValues =
    props.type === "Se connecter"
      ? {
          email: "",
          password: ""
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          termsAccepted: false
        };

  const { handleSubmit, values } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues
  });

  const onSubmit = handleSubmit(async (formValues) => {
    loading.value = true;
    try {
      console.log("📤 Données envoyées :", formValues);

      if (props.type === "S'inscrire") {
        await register({
          firstName: formValues.firstName || "",
          lastName: formValues.lastName || "",
          email: formValues.email,
          password: formValues.password,
          confirmPassword: formValues.confirmPassword || ""
        });
        console.log("✅ Inscription réussie !");
        router.push("/auth/login");
      } else {
        const response = await login(formValues.email, formValues.password);
        if (response.token) {
          authStore.setToken(response.token);
          authStore.setUser({ email: formValues.email });
          router.push("/account/profile");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  });
</script>
