<script setup>
definePageMeta({
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/products",
  },
});

import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
const { signIn } = useAuth();
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "vue-sonner";

const router = useRouter();

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: "Обязательное поле" })
      .email("Некорректный адрес"),
    password: z.string({ required_error: "Обязательное поле" }),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  signIn("credintials", {
    ...values,
    callbackUrl: "/",
  }).then(() => {
  toast.success("Вы вошли в аккаунт");
    }).catch(e => {
        toast.error("Неверный логин или пароль");
    });
});
</script>

<template>
  <div class="min-h-screen">
    <div class="flex w-[400px] mx-auto mt-20">
      <form @submit="onSubmit" class="w-full flex flex-col gap-2">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Пароль</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full mt-4">Войти</Button>
      </form>
    </div>
  </div>
</template>
