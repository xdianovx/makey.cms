<template>
  <NuxtLoadingIndicator color="#000" />

  <div>
    <slot />
    <Toaster />
  </div>
</template>

<script setup>
import { Toaster } from "@/components/ui/sonner";

definePageMeta({});
</script>

<style lang="scss" scoped></style>
