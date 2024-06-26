<script lang="ts" setup>
import { Plus, Settings2 } from "lucide-vue-next";
import Inner from "~/components/ui/Inner.vue";
import Title from "~/components/ui/Title.vue";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Button from "~/components/ui/button/Button.vue";

const { get } = categoryStore();
const { categories } = storeToRefs(categoryStore());

get();
</script>

<template>
  <Inner>
    <div class="flex items-end">
      <Title>Категории</Title>
      <div class="ml-auto">
        <Button><Plus /></Button>
      </div>
    </div>

    <div class="flex flex-col mt-10 gap-2">
      <div v-for="item in categories" class="border px-5 py-4 rounded-lg">
        <div class="flex">
          <div class="flex flex-col">
            <h2 class="text-md leading-[100%] font-medium">{{ item.title }}</h2>
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
                <DropdownMenuItem>Редактировать</DropdownMenuItem>
                <DropdownMenuItem>Удалить</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  </Inner>
</template>

<style></style>
