<script setup>
import Title from "@/components/ui/Title";
const props = defineProps(["data"]);
</script>

<template>
  <div v-bind="$attrs">
    <Title tag="h2">Оплата</Title>

    <div class="bg-gray-200 h-[1px] mt-2"></div>

    <div class="mt-4 flex flex-col gap-1">
      <p>Оплата через: {{ data.title }}</p>
      <p>
        Дата платежа: {{ new Date(data.created_at).toLocaleString("ru", {}) }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
