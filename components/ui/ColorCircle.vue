<script setup>
import { string } from "zod";

const props = defineProps({
  color: {
    type: string,
  },
  size: {
    default: "md",
  },
});
</script>

<template>
  <div
    class="rounded-full border border-black"
    :class="[size === 'md' ? 'w-5 h-5' : '', size === 'lg' ? 'w-10 h-10' : '']"
    :style="{ background: color }"
  ></div>
</template>

<style lang="scss" scoped></style>
