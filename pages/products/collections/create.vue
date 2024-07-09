<script setup>
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import { toast } from "vue-sonner";

const { create } = collectionStore();
const createRef = ref({
  title: "",
  description: "Описание коллекции",
});

const storeCollection = async () => {
  if (!createRef.value.title) {
    toast.error("Введите название коллекции");
  } else {
    create(createRef.value);
  }
};
</script>

<template>
  <Inner>
    <div class="flex items-center justify-between">
      <Title>Создать новую коллекцию</Title>
      <NuxtLink
        href="/products/collections"
        class="border inline-block leading-[100%] pt-[12px] pb-[13px] px-4 rounded-md"
        >Назад</NuxtLink
      >
    </div>

    <div class="flex mt-8 flex-col gap-4">
      <Input
        v-model="createRef.title"
        label="Название"
        placeholder="Введите название коллекции"
      />
      <Button @click="storeCollection">Сохранить</Button>
    </div>
  </Inner>
</template>

<style lang="scss" scoped></style>
