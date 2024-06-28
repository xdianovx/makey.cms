<script setup>
import Inner from "@/components/ui/Inner.vue";
import Title from "@/components/ui/Title.vue";

const router = useRouter();

const { get: getCategories } = categoryStore();
const { get: getCollections } = collectionStore();
const { get: getGroups } = productsGroupsStore();
const { createProduct } = productStoreStore();

const { categories } = storeToRefs(categoryStore());
const { collections } = storeToRefs(collectionStore());

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "vue-sonner";
import Input from "~/components/ui/input/Input.vue";

definePageMeta({
  layout: "product-single",
});

const storeData = ref({
  title: "",
  is_man: 0,
  is_woman: 0,
  category_id: "",
  collection_id: "",
  type_id: "",
});

const storeProduct = async () => {
  if (storeData.value.title.length <= 0) {
    toast.error("Введите название товара");
  } else {
    await createProduct(storeData)
      .then(() => {
        router.push(`/products`);
      })
      .catch((e) => {
        toast.error("Ошибка создания товара");
        console.log(e);
      });
  }
};

getCategories();
getCollections();
getGroups();
</script>

<template>
  <Inner>
    <Title>Создать товар</Title>

    {{ storeData }}

    <Input
      placeholder="Название товара"
      v-model="storeData.title"
      required
      class="leading-[100%] mt-8"
    />

    <div class="grid grid-cols-3 gap-2 mt-2">
      <!--  -->
      <Select v-model="storeData.category_id">
        <SelectTrigger class="leading-[100%]">
          <SelectValue placeholder="Категория" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem :value="item.id" v-for="item in categories">
              {{ item.title }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <!--  -->
      <Select v-model="storeData.collection_id">
        <SelectTrigger class="leading-[100%]">
          <SelectValue placeholder="Коллекции" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem :value="item.id" v-for="item in collections">
              {{ item.title }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <!--  -->
      <Select v-if="storeData.category_id == 1">
        <SelectTrigger class="leading-[100%]">
          <SelectValue placeholder="Категория" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem :value="item.id" v-for="item in categories">
              {{ item.title }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="flex mt-4 gap-4">
      <div class="flex items-center gap-2">
        <Checkbox
          v-model:checked="storeData.is_man"
          id="isman"
          :true-value="1"
        />
        <label for="isman" class="leading-none">Мужской</label>
      </div>

      <div class="flex items-center gap-2">
        <Checkbox
          v-model:checked="storeData.is_woman"
          id="iswoman"
          :true-value="1"
        />
        <label for="iswoman" class="leading-none">Женский</label>
      </div>
    </div>

    <Button class="mt-8" @click="storeProduct">Создать</Button>
  </Inner>
</template>

<style lang="scss" scoped></style>
