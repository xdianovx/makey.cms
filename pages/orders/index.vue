<script setup>
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import SearchInput from "~/components/ui/form/SearchInput.vue";

const { get } = ordersStore();
const { orders } = storeToRefs(ordersStore());

get();
</script>

<template>
  <Inner>
    <div class="flex">
      <Title>Заказы</Title>
    </div>

    <SearchInput v-model="tRef" placeholder="Поиск по заказам" class="mt-8" />

    <!-- Orders Tab -->

    <div class="flex flex-col gap-4 mt-8">
      <SharedOrderCard v-for="item in orders" :key="item.id" :data="item" />
    </div>
  </Inner>
</template>

<style lang="scss" scoped></style>
