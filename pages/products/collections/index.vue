<script setup>
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const { get, removeCollection } = collectionStore();
const { collections } = storeToRefs(collectionStore());

get();

const deleteCollection = async (id) => {
  removeCollection(id);
  console.log(id);
};
</script>

<template>
  <Inner>
    <div class="flex items-end">
      <Title>Коллекции</Title>
      <div class="ml-auto">
        <NuxtLink
          to="/products/collections/create"
          class="leading-[100%] border border-gray-300 rounded-md px-4 pt-2 pb-[9px]"
          >Создать коллекцию</NuxtLink
        >
      </div>
    </div>

    <section class="mt-10 flex flex-col gap-8">
      <!-- Item -->
      <div v-for="item in collections" :key="item.id" class="border-b pb-8">
        <div class="flex items-center">
          <NuxtLink
            :to="'collections/' + item.id"
            class="font-medium transition-colors duration-200 ease-in-out hover:text-primary"
          >
            {{ item.title }}
          </NuxtLink>

          <div class="ml-auto">
            <DeleteButton @click="deleteCollection(item.id)" />
          </div>
        </div>
        <div class="flex gap-4 mt-1 text-gray-500">
          <div>{{ item.is_active ? "Активная" : "Неактивная" }}</div>
          <div>Товаров: {{ item.products_count }}</div>
          <div>Создана: {{ useDateFormat(item.created_at) }}</div>
        </div>
        <p class="mt-2 text-sm p-4 bg-gray-100 rounded-lg">
          {{ item.description }}
        </p>
      </div>
    </section>
  </Inner>
</template>

<style lang="scss" scoped></style>
