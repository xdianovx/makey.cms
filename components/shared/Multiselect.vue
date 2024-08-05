<script setup>
import Label from "~/components/ui/label/Label.vue";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import { ChevronDown, X } from "lucide-vue-next";

const props = defineProps({
  label: String,
  list: Array,
  placeholder: String,
});
const model = defineModel();
const isOpen = ref(false);
const target = ref(null);
const searchQuery = ref("");

const selectedOptions = ref(model);
onClickOutside(target, () => (isOpen.value = false));

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.list;
  return props.list.filter((option) =>
    option.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const toggleSelection = (option) => {
  const index = selectedOptions.value.findIndex((o) => o == option.id);

  if (index === -1) {
    selectedOptions.value.push(option.id);
  } else {
    selectedOptions.value.splice(index, 1);
  }
};

const removeSelection = (option) => {
  const id = selectedOptions.value.findIndex((o) => o == option);

  selectedOptions.value.splice(id, 1);
};

const isSelected = (item) => {
  return selectedOptions.value.some((o) => o == item.id);
};

const getItemById = (item) => props.list.find((i) => i.id == item);
</script>

<template>
  <div class="relative" ref="target">
    <div class="flex flex-col gap-2">
      <Label>{{ label }}</Label>
      <div
        class="flex h-10 w-full items-center gap-1 justify-between rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none leading-[100%]"
      >
        <input
          v-model="searchQuery"
          :placeholder="placeholder"
          @focus="isOpen = true"
          class="outline-none grow py-2"
        />

        <ChevronDown
          size="16"
          :class="{ 'rotate-180': isOpen }"
          class="transition-all duration-200 ease-out"
        />
      </div>

      <div class="flex flex-wrap gap-1">
        <div
          class="flex items-center gap-2 border border-primary leading-[100%] py-[4px] pr-2 pl-3 rounded-md"
          v-for="item in selectedOptions"
        >
          {{ getItemById(item)?.title }}
          {{ getItemById(item)?.is_man ? "М" : "" }}
          {{ getItemById(item)?.is_woman ? "Ж" : "" }}

          <div class="h-full w-[1px] bg-border py-[2px]"></div>
          <X size="14" class="cursor-pointer" @click="removeSelection(item)" />
        </div>
      </div>
    </div>

    <div
      class="absolute max-h-[200px] overflow-y-auto text-sm bg-white px-2 py-2 mt-2 border w-full border-input rounded-md"
      v-if="isOpen"
    >
      <div
        v-if="filteredOptions.length > 0"
        v-for="item in filteredOptions"
        class="flex cursor-pointer items-center gap-2 hover:bg-slate-100 px-3 rounded-sm"
      >
        <input
          type="checkbox"
          :checked="isSelected(item)"
          :id="item.id"
          @change="toggleSelection(item)"
        />
        <label
          :for="item.id"
          class="grow flex items-center gap-1 py-2 cursor-pointer"
        >
          {{ item.title }}

          <div
            v-if="item?.is_man"
            class="rounded-full w-5 h-5 flex item-center justify-center leading-[100%] border-border border"
          >
            {{ item?.is_man ? "м" : "" }}
          </div>
          <div
            v-if="item?.is_woman"
            class="rounded-full w-5 h-5 flex item-center justify-center leading-[100%] border-border border"
          >
            {{ item?.is_woman ? "ж" : "" }}
          </div>
        </label>
      </div>

      <div
        class="flex cursor-pointer items-center gap-2 px-3 rounded-sm"
        v-else
      >
        Ничего не найдено
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
