<script setup>
import Title from "@/components/ui/Title";
const props = defineProps(["data"]);
const model = defineModel();
</script>

<template>
  <div v-bind="$attrs">
    <Title tag="h2">Комментарий к заказу</Title>

    <div class="bg-gray-200 h-[1px] mt-2"></div>

    <div class="mt-4 flex flex-col gap-1">
      <Textarea v-model="model.comment_order"></Textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
