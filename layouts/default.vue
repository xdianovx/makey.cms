<template>
  <NuxtLoadingIndicator color="red" />
  <div class="min-h-screen flex flex-col">
    <SharedHeader />
    <main class="grow grid h-full grid-cols-[300px_1fr_300px]">
      <SharedAside />
      <slot />
    </main>
    <Toaster />
  </div>
</template>

<script lang="ts" setup>
import { Toaster } from "vue-sonner";

definePageMeta({});
</script>

<style></style>
