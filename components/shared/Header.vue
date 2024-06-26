<template>
  <header class="py-2 border border-b">
    <Container>
      <div class="flex items-center">
        <NuxtLink to="/">LOGO</NuxtLink>

        <div class="ml-auto">
          <Button variant="outline" @clink="signOut()">Выйти</Button>
        </div>
      </div>
    </Container>
  </header>
</template>

<script lang="ts" setup>
import { LogOut } from "lucide-vue-next";
import Container from "../ui/Container.vue";
const { signIn, token, signOut } = useAuth();
</script>

<style></style>
