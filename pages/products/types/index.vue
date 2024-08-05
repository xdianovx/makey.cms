<script setup>
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import { EditIcon, Trash } from "lucide-vue-next";
import { toast } from "vue-sonner";
import Button from "~/components/ui/button/Button.vue";
import Input from "~/components/ui/input/Input.vue";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Label from "~/components/ui/label/Label.vue";
import Select from "~/components/ui/select/Select.vue";

// const { get, create, remove, edit } = materialsStore();
const { get, create, remove, edit } = typesStore();
const { types } = storeToRefs(typesStore());

const { get: getCategories } = categoryStore();
const { categories } = storeToRefs(categoryStore());

const dataRef = ref({
  title: "",
  category_id: 1,
});

const updateRef = ref({
  title: "",
});

const storeMaterial = async () => {
  if (dataRef.value.title.length <= 0) {
    toast.error("Введите название типа");
  } else {
    create(dataRef);
  }
};

const deleteItem = (slug) => {
  remove(slug);
};

await get();
await getCategories();
</script>

<template>
  <Inner>
    <div class="flex">
      <Title>Типы</Title>
    </div>

    <div class="flex flex-col gap-2 mt-8">
      <div
        class="border px-4 py-4 rounded-lg leading-[100%]"
        v-for="item in types"
      >
        <div class="flex items-start">
          <div class="flex flex-col">
            <div class="flex gap-2">
              <h2 class="font-medium leading-none">{{ item.title }}</h2>
              <div class="flex items-center mt-0 text-sm">
                <div>Товаров: {{ item.products_count }}</div>
              </div>
            </div>

            <div class="mt-4">
              {{ item.category?.title }} {{ item.category.is_man ? "м" : "" }}
              {{ item.category.is_woman ? "ж" : "" }}
            </div>
          </div>

          <div class="ml-auto flex gap-1">
            <!-- Удалить -->
            <Dialog>
              <DialogTrigger as-child>
                <button
                  class="border rounded-md w-8 h-8 inline-flex items-center justify-center"
                >
                  <Trash width="16" class="text-red-700" />
                </button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Точно удалить?</DialogTitle>
                  <!-- <DialogDescription> Потом не восстановим </DialogDescription> -->
                </DialogHeader>

                <div class="flex w-full gap-2">
                  <DialogClose as-child class="w-full">
                    <Button @click="deleteItem(item.slug)">Да</Button>
                  </DialogClose>

                  <DialogClose as-child class="w-full">
                    <Button variant="outline">Отмена</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
            <!-- Редактировать -->
            <Dialog>
              <DialogTrigger as-child>
                <button
                  class="border rounded-md w-8 h-8 inline-flex items-center justify-center"
                >
                  <EditIcon width="16" class="" />
                </button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Редактировать</DialogTitle>
                  <!-- <DialogDescription> Потом не восстановим </DialogDescription> -->
                </DialogHeader>

                <Input v-model="updateRef.title" />
                <div class="flex w-full gap-2">
                  <DialogClose as-child class="w-full">
                    <Button @click="edit(item.slug, updateRef)"
                      >Сохранить</Button
                    >
                  </DialogClose>

                  <DialogClose as-child class="w-full">
                    <Button variant="outline">Отмена</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <Title>Добавить тип</Title>

      <div class="flex flex-col mt-4">
        <div class="flex flex-col gap-2">
          <Label>Название типа</Label>
          <Input required v-model="dataRef.title" />
        </div>

        <div class="flex flex-col gap-2 mt-8">
          <Label>Тип</Label>

          <Select v-model="dataRef.category_id">
            <SelectTrigger class="leading-[100%]">
              <SelectValue
                placeholder="
                  productRef.type_id ? productRef.type_id : 'Выберите тип'
                "
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem :value="item.id" v-for="item in categories">
                  {{ item.title }} {{ item.is_man ? "м" : "" }}
                  {{ item.is_woman ? "ж" : "" }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button @click="storeMaterial" class="mt-4">Добавить</Button>
      </div>
    </div>
  </Inner>
</template>

<style lang="scss" scoped></style>
