<script lang="ts" setup>
import { Settings2 } from "lucide-vue-next";
import Inner from "~/components/ui/Inner.vue";
import Title from "~/components/ui/Title.vue";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Button from "~/components/ui/button/Button.vue";

const { getMen, createNew, deleteItem } = categoryStore();
const { categories } = storeToRefs(categoryStore());

const createCateforyRef = ref({
  title: "",
  is_active: 1,
  is_man: 1,
  is_woman: 0,
});
const isCreateModalShow = ref(false);
const showCreateModal = () => {
  isCreateModalShow.value = !isCreateModalShow.value;
};

const addCategory = async () => {
  await createNew(createCateforyRef.value).then(() => {
    showCreateModal();
  });
};

getMen();
</script>

<template>
  <Inner>
    <div class="flex items-end">
      <Title>Категории</Title>
      <div class="ml-auto">
        <Button @click="showCreateModal">Добавить категорию</Button>
      </div>
    </div>

    <div class="mt-8 flex gap-4">
      <NuxtLink to="/products/categories" class="">Все</NuxtLink>
      <NuxtLink to="/products/categories/men" class="text-primary underline"
        >Мужские</NuxtLink
      >
      <NuxtLink to="/products/categories/women" class="">Женские</NuxtLink>
    </div>

    <div class="flex flex-col mt-10 gap-2">
      <div v-for="item in categories" class="border px-5 py-4 rounded-lg">
        <div class="flex">
          <div class="flex flex-col">
            <NuxtLink
              :to="`/products/categories/${item.id}`"
              class="font-medium transition-colors duration-200 ease-in-out hover:text-primary"
              >{{ item.title }}</NuxtLink
            >
            <p class="mt-2 text-sm text-gray-600 leading-[100%]">
              Товаров в категории: {{ item.products_count }}
            </p>
          </div>

          <div class="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" class="p-4">
                  <Settings2 width="16" height="16" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <NuxtLink :to="`/products/categories/${item.id}`"
                    >Редактировать</NuxtLink
                  >
                </DropdownMenuItem>
                <DropdownMenuItem @click="deleteItem(item.id)"
                  >Удалить</DropdownMenuItem
                >
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  </Inner>

  <Dialog :open="isCreateModalShow" :onUpdate:open="showCreateModal">
    <DialogContent>
      <Title>Добавить категорию</Title>

      <div class="flex flex-col gap-2">
        <Label>Название категории</Label>
        <Input
          required
          placeholder="Название категории"
          v-model="createCateforyRef.title"
        />
      </div>

      <div class="flex flex-col gap-2">
        <Label>Пол</Label>

        <div class="flex gap-4">
          <div class="flex gap-3">
            <input
              type="checkbox"
              v-model="createCateforyRef.is_man"
              :true-value="1"
              :false-value="0"
              id="a1"
            />
            <label for="a1" class="block leading-[100%] cursor-pointer"
              >Мужская</label
            >
          </div>

          <div class="flex gap-3 cursor-pointer">
            <input
              type="checkbox"
              v-model="createCateforyRef.is_woman"
              :true-value="1"
              :false-value="0"
              id="a2"
            />
            <label for="a2" class="block leading-[100%] cursor-pointer"
              >Женская</label
            >
          </div>
        </div>
      </div>
      <Button @click="addCategory"> Добавить</Button>
    </DialogContent>
  </Dialog>
</template>

<style></style>
