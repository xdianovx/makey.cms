<script setup>
definePageMeta({
  layout: "product",
});

import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
const { filterProducts } = productStoreStore();
const { products, isLoading, params } = storeToRefs(productStoreStore());

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
        <div
          class="mt-4 flex items-center justify-center"
          v-if="products?.meta"
        >
          <div class="text-sm text-gray-500">
            Страница {{ params.page }} из {{ products?.meta.last_page }}
          </div>
          <div class="flex-1"></div>
          <button
            class="btn border rounded-lg px-4 py-2"
            :disabled="params.page === 1"
            @click="params.page--"
          >
            Предыдущая
          </button>
          <button
            class="btn border rounded-lg px-4 py-2 ml-2"
            :disabled="params.page === products?.meta.total_pages"
            @click="params.page++"
          >
            Следующая
          </button>
        </div>
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
