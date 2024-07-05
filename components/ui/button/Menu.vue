<template>
  <button
    class="inline-flex items-center justify-center border border-gray-200 bg-white w-7 h-7 rounded-sm"
    v-bind="$attrs"
  >
    <GripVertical height="16" />
  </button>
</template>

<script setup>
import { GripVertical } from "lucide-vue-next";
</script>

<style lang="scss" scoped></style>
