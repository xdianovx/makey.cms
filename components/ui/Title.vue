<script setup>
const props = defineProps({
  tag: {
    type: String,
    default: "h1",
  },
});
</script>

<template>
  <h1 v-if="tag === 'h1'" class="text-xl font-medium">
    <slot />
  </h1>

  <h2 v-if="tag === 'h2'" class="text-md font-medium">
    <slot />
  </h2>
</template>
