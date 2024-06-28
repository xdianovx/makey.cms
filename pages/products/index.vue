<script setup>
definePageMeta({
  layout: "product",
});

import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
const { filterProducts } = productStoreStore();
const { products, isLoading, params } = storeToRefs(productStoreStore());

watchDebounced(
  () => params.value?.search,
  () => {
    params.value?.search;
  },
  { debounce: 200, maxWait: 5000 }
);

filterProducts(params.value);
</script>

<template>
  <section>
    <Inner>
      <div class="flex items-end">
        <Title>Все товары</Title>
        <div class="ml-auto">
          <NuxtLink
            to="/products/create"
            size="sm"
            variant="outline"
            class="border rounded md pt-[8px] pb-[10px] leading-[100%] inline-flex items-center gap-2 px-4 text-[14px]"
          >
            <p>Добавить товар</p></NuxtLink
          >
        </div>
      </div>
      <Input
        class="mt-2"
        v-model="params.search"
        placeholder="Поиск по товарам"
      />
      <div
        class="flex flex-col mt-10 gap-2"
        v-if="products?.data?.length > 0"
        :class="{ 'opacity-20': isLoading }"
      >
        <SharedProductRow
          v-for="item in products?.data"
          :data="item"
          :key="item.id"
        />
      </div>

      <div
        class="border rounded-lg p-5 mt-10 text-center"
        :class="{ 'opacity-20': isLoading }"
        v-else
      >
        Ничего не найдено
      </div>
    </Inner>
  </section>
</template>

<style></style>
