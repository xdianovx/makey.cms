<script setup>
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import ColorCircle from "~/components/ui/ColorCircle.vue";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Label from "~/components/ui/label/Label.vue";
import Input from "~/components/ui/input/Input.vue";

const { get: getColors, createNew, deleteItem } = colorsStore();
const { colors, loading } = storeToRefs(colorsStore());

getColors();

const isCreateModalShow = ref(false);
const createColorRef = ref({
  title: "",
  code: "",
});

const showCreateModal = () => {
  isCreateModalShow.value = !isCreateModalShow.value;
};

const addColor = async () => {
  await createNew(createColorRef.value).then(() => {
    showCreateModal();
  });
};
</script>

<template>
  <Inner>
    <div class="flex">
      <Title>Цвета</Title>

      <Button class="ml-auto" @click="showCreateModal">Добавить цвет</Button>
    </div>

    <div class="flex flex-col gap-2 mt-8">
      <div
        class="border px-4 py-4 rounded-lg leading-[100%]"
        v-for="item in colors"
      >
        <div class="flex items-center gap-2">
          <ColorCircle :color="item.code" />
          <h2 class="font-medium leading-none">{{ item.title }}</h2>

          <DeleteButton class="ml-auto" @click="deleteItem(item.slug)" />
        </div>

        <p class="text-sm mt-3 leading-[100%] text-gray-600">
          Товаров: {{ item.products_count }}
        </p>
      </div>
    </div>
  </Inner>

  <Dialog :open="isCreateModalShow" :onUpdate:open="showCreateModal">
    <DialogContent>
      <Title>Добавить новый цвет</Title>

      <div class="flex flex-col gap-2">
        <Label>Название цвета</Label>
        <Input required placeholder="Синий" v-model="createColorRef.title" />
      </div>

      <div class="flex flex-col gap-2">
        <Label>Код цвета (HEX)</Label>
        <Input required placeholder="#000000" v-model="createColorRef.code" />
      </div>

      <Button @click="addColor">Добавить</Button>
    </DialogContent>
  </Dialog>
</template>

<style lang="scss" scoped></style>
