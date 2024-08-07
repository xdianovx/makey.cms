<script setup>
import { Search } from "lucide-vue-next";

const model = defineModel();
const props = defineProps({
  placeholder: {
    type: String,
    default: "Поиск...",
  },
});

const emit = defineEmits(["change"]);

function onChange(event) {
  emit("change", event.target.value);
}
</script>

<template>
  <div class="relative" v-bind="$attrs">
    <input
      class="rounded-lg border w-full border-gray-300 leading-[100%] pt-[11px] pb-[12px] block pl-[44px] pr-4"
      type="text"
      v-model="model"
      @input="onChange"
      :placeholder="placeholder"
    />
    <Search
      class="text-gray-300 absolute top-[10px] left-[10px] outline-none"
    />
  </div>
</template>

<style lang="scss" scoped></style>
