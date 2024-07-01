<script setup>
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import { DotSquare, GripVertical, LucideDotSquare } from "lucide-vue-next";

const { get } = collectionStore();
const { collections } = storeToRefs(collectionStore());

get();
</script>

<template>
  <Inner>
    <div class="flex items-end">
      <Title>Коллекции</Title>
      <div class="ml-auto">
        <Button>Создать коллекцию</Button>
      </div>
    </div>

    <section class="mt-10 flex flex-col gap-8">
      <!-- Item -->
      <div v-for="item in collections" :key="item.id" class="border-b pb-8">
        <div class="flex items-center">
          <NuxtLink :to="'collections/' + item.id" class="font-medium">{{
            item.title
          }}</NuxtLink>

          <div class="ml-auto">
            <button
              class="w-8 h-8 border rounded-sm cursor-pointer flex items-center justify-center"
            >
              <GripVertical width="16" />
            </button>
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
