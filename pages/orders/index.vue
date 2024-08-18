<script setup>
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import SearchInput from "~/components/ui/form/SearchInput.vue";
import { ORDER_STATUSES } from "~/lib/constants";

const { get } = ordersStore();
const { orders, params } = storeToRefs(ordersStore());

await get();

const handleClickOrderId = (id) => {
  if (params.value["order_statuses[]"].includes(id)) {
    const index = params.value["order_statuses[]"].indexOf(id);
    params.value["order_statuses[]"].splice(index, 1);
  } else {
    params.value["order_statuses[]"].push(id);
  }
};
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

    <SearchInput
      v-model="params.search"
      placeholder="Поиск по заказам"
      class="mt-8"
    />

    <div class="flex gap-2 mt-4">
      <div
        v-for="item in ORDER_STATUSES"
        @click="handleClickOrderId(item.id)"
        :class="{
          'bg-primary text-white': params['order_statuses[]']?.includes(
            item.id
          ),
        }"
        class="px-4 py-1 border border-primary rounded-lg cursor-pointer transition-colors hover:bg-primary hover:text-white"
      >
        {{ item.status }}
      </div>
    </div>

    <div class="mt-6 flex items-center justify-center" v-if="orders?.meta">
      <div class="text-sm text-gray-500">
        Страница {{ orders.meta.current_page }} из
        {{ orders.meta.last_page }}
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
        :disabled="params.current_page === orders?.meta.total"
        @click="params.page++"
      >
        Следующая
      </button>
    </div>

    <div class="flex flex-col gap-4 mt-8" :class="{ 'opacity-20': loading }">
      <SharedOrderCard
        v-for="item in orders.data"
        :key="item?.id"
        :data="item"
      />

      <div class="mt-4 flex items-center justify-center" v-if="orders?.meta">
        <div class="text-sm text-gray-500">
          Страница {{ orders.meta.current_page }} из
          {{ orders.meta.last_page }}
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
          :disabled="params.current_page === orders?.meta.total"
          @click="params.page++"
        >
          Следующая
        </button>
      </div>
    </div>
  </Inner>
</template>

<style lang="scss" scoped></style>
