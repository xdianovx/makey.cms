<template>
  <NuxtLoadingIndicator color="#000" />

  <div class="min-h-screen flex flex-col">
    <SharedHeader />
    <main class="grow grid h-full grid-cols-[300px_1fr]">
      <SharedAside />
      <slot />
      <Toaster />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { Toaster } from "vue-sonner";

definePageMeta({});
</script>

<style></style>
