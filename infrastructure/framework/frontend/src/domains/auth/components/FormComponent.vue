<template>
  <form @submit="onSubmit">
    <CardContent>
      <div
        v-if="type === 'Se connecter'"
        class="grid grid-cols-1 gap-6"
      >
        <FormField name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                v-model="values.email"
                type="email"
                placeholder="Entrez votre email"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="password">
          <FormItem>
            <FormLabel>Mot de passe</FormLabel>
            <FormControl>
              <Input
                v-model="values.password"
                type="password"
                placeholder="Entrez votre mot de passe"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div
        v-else-if="type === 'S\'inscrire'"
        class="grid grid-cols-1 gap-6"
      >
        <FormField name="lastName">
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input
                v-model="values.lastName"
                type="text"
                placeholder="Entrez votre nom"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="firstName">
          <FormItem>
            <FormLabel>Prénom</FormLabel>
            <FormControl>
              <Input
                v-model="values.firstName"
                type="text"
                placeholder="Entrez votre prénom"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                v-model="values.email"
                type="email"
                placeholder="Entrez votre email"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="password">
          <FormItem>
            <FormLabel>Mot de passe</FormLabel>
            <FormControl>
              <Input
                v-model="values.password"
                type="password"
                placeholder="Entrez votre mot de passe"
              />
            </FormControl>
            <FormMessage />
            <div class="text-sm p-1">
              <ul>
                <li>Minimum 12 caractères</li>
                <li>Maximum 255 caractères</li>
                <li>Au moins 1 miniscule et au moins 1 majuscule</li>
                <li>Au moins 1 chiffre</li>
                <li>
                  Au moins un caractère spécial :
                  <span>,.;?:/!ù%^@!_-#&()[]{}=+*</span>
                </li>
              </ul>
            </div>
          </FormItem>
        </FormField>
        <FormField name="confirmPassword">
          <FormItem>
            <FormLabel>Confirmez le mot de passe</FormLabel>
            <FormControl>
              <Input
                v-model="values.confirmPassword"
                type="password"
                placeholder="Confirmez votre mot de passe"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex space-x-2">
          <Checkbox
            id="terms"
            class="mr-2 mt-1"
          />
          <label for="terms">
            <span>J'accepte les</span>
            <RouterLink
              to="#"
              class="font-bold first-line:hover:underline"
            >
              conditions d'utilisation
            </RouterLink>
            <span>et la</span>
            <RouterLink
              to="#"
              class="font-bold first-line:hover:underline"
            >
              politique de confidentialité
            </RouterLink>
            .
          </label>
        </div>
      </div>
    </CardContent>
    <CardFooter class="grid grid-cols-1 gap-4">
      <Button
        type="submit"
        class="w-full"
      >
        {{ type }}
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
      <div v-else-if="type === 'S\'inscrire'">
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
  import { RouterLink, useRouter } from "vue-router";
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import { ref } from "vue";
  import * as z from "zod";

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

  const props = defineProps<{
    type: "Se connecter" | "S'inscrire";
  }>();

  const baseSchema = z.object({
    email: z.string().email("Adresse email invalide"),
    password: z
      .string()
      .min(12, "Le mot de passe doit contenir au moins 12 caractères")
      .max(255, "Le mot de passe ne peut pas dépasser 255 caractères")
      .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
      .regex(
        /[ ,.;?:/!ù%^@!\_\-#&()\[\]{}=+*]/,
        "Le mot de passe doit contenir au moins un caractère spécial"
      )
  });

  const loginSchema = baseSchema;

  const registerSchema = baseSchema.extend({
    confirmPassword: z.string().superRefine((confirmPasswordValue, ctx) => {
      if (ctx.parent && confirmPasswordValue !== ctx.parent.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Les mots de passe ne correspondent pas"
        });
      }
    }),
    lastName: z.string().transform((value) => value.toUpperCase()),
    firstName: z.string().transform((value) =>
      value
        .split("-")
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join("-")
    ),
    termsAccepted: z.boolean().refine((value) => value, {
      message: "Vous devez accepter les conditions d'utilisation"
    })
  });

  const schema = props.type === "Se connecter" ? loginSchema : registerSchema;

  interface FormValues {
    email: string;
    password: string;
    confirmPassword?: string;
    lastName?: string;
    firstName?: string;
    termsAccepted?: boolean;
  }

  const { handleSubmit, values } = useForm<FormValues>({
    validationSchema: toTypedSchema(schema),
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      lastName: "",
      firstName: "",
      termsAccepted: false
    }
  });

  const errors = ref<string[]>([]);
  const router = useRouter();

  const onSubmit = handleSubmit(async (formValues) => {
    errors.value = [];
    try {
      console.log("Données soumises :", formValues);
    } catch (err) {
      errors.value.push("Une erreur est survenue lors de la soumission.");
    }
  });
</script>
