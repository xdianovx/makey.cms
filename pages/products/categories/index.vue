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

const { get, createNew, deleteItem } = categoryStore();
const { categories } = storeToRefs(categoryStore());

const createCateforyRef = ref({
  title: "",
  is_active: 1,
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

get();
</script>

<template>
  <Inner>
    <div class="flex items-end">
      <Title>Категории</Title>
      <div class="ml-auto">
        <Button @click="showCreateModal">Добавить категорию</Button>
      </div>
    </div>

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

        <Button @click="addCategory"> Добавить</Button>
      </DialogContent>
    </Dialog>

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
</template>

<style></style>
