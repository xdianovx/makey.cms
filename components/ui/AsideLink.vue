<script lang="ts" setup>
const props = defineProps(["link", "text"]);
</script>

<template>
  <NuxtLink
    :to="link"
    class="flex items-center gap-2 transition-all group"
    active-class="text-primary"
  >
    <slot />
    <p class="group-hover:text-primary">{{ text }}</p>
  </NuxtLink>
</template>

<style></style>
