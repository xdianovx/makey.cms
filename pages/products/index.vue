<script setup>
definePageMeta({
  layout: "product",
});

import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import { Plus } from "lucide-vue-next";
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
          <Button
            ><Plus />
            <p>Добавить товар</p></Button
          >
        </div>
      </div>
      <Input
        class="mt-2"
        v-model="params.search"
        placeholder="Поиск по товарам"
      />
      <!-- {{ products?.data }} -->
      <div
        class="flex flex-col mt-10 gap-2"
        v-if="products?.data.length > 0"
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
