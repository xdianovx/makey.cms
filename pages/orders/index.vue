<script setup>
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import Button from "~/components/ui/button/Button.vue";
import SearchInput from "~/components/ui/form/SearchInput.vue";

const { get } = ordersStore();
const { orders } = storeToRefs(ordersStore());

get();
</script>

<template>
  <Inner>
    <div class="flex items-center justify-between">
      <Title>Заказы</Title>

      <NuxtLink
        class="bg-primary rounded-md text-white px-4 py-3 leading-[100%] hover:text-white hover:bg-primary/80"
        to="/orders/create"
      >
        Создать заказ
      </NuxtLink>
    </div>

    <!-- <SearchInput v-model="tRef" placeholder="Поиск по заказам" class="mt-8" /> -->

    <!-- Orders Tab -->

    <div class="flex flex-col gap-4 mt-8">
      <SharedOrderCard v-for="item in orders" :key="item.id" :data="item" />
    </div>
  </Inner>
</template>

<style lang="scss" scoped></style>
