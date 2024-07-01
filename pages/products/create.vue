<script setup>
import Inner from "@/components/ui/Inner.vue";
import Title from "@/components/ui/Title.vue";

const { createProduct } = productStoreStore();
const { product } = storeToRefs(productStoreStore());

import { toast } from "vue-sonner";
import Input from "~/components/ui/input/Input.vue";

definePageMeta({
  layout: "product-single",
});

const storeData = ref({
  title: "",
  is_man: 0,
  is_woman: 0,
  category_id: "",
  collection_id: "",
  type_id: "",
});

const storeProduct = () => {
  if (storeData.value.title.length <= 0) {
    toast.error("Введите название товара");
  } else {
    createProduct(storeData)
      .then(() => {
        navigateTo(`/products/${product?.value.id}`);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Товар с таким названием уже существует");
      });
  }
};
</script>

<template>
  <Inner>
    <Title>Создать товар</Title>

    <Input
      placeholder="Название товара"
      v-model="storeData.title"
      required
      class="leading-[100%] mt-8"
    />

    <Button class="mt-8" @click="storeProduct">Создать</Button>
  </Inner>
</template>

<style lang="scss" scoped></style>
