<template>
  <div>
    <slot />
    <Toaster />
  </div>
</template>

<script setup>
import { Toaster } from "@/components/ui/sonner";

definePageMeta({
  // middleware: ["is-logged"],
});
</script>

<style lang="scss" scoped></style>
