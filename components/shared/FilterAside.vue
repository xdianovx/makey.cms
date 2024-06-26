<script setup>
import { Checkbox } from "../ui/checkbox";
import CheckboxLabel from "../ui/ChecboxLabel";

const { get: getCategory } = categoryStore();
const { get: getProductGroups } = productsGroupsStore();

const { categories } = storeToRefs(categoryStore());
const { groups } = storeToRefs(productsGroupsStore());

const { params } = storeToRefs(productStoreStore());

const a = ref(true);

const set = (id) => {
  if (params.value["categories[]"]?.includes(id)) {
    params.value["categories[]"].splice(
      params.value["categories[]"].indexOf(id),
      1
    );
  } else {
    params.value["categories[]"]?.push(id);
  }
};

const clear = () => {
  params.value = {
    search: "",
    "categories[]": [],
    is_men: "",
    is_women: "",
  };
};

getCategory();
getProductGroups();
</script>

<template>
  <div class="border-l">
    <div class="p-5 sticky top-0 h-[calc(100vh-57px)] flex flex-col">
      <!-- Item -->
      <div class="">
        <h2 class="mb-4 font-semibold text-md">Категории</h2>
        <div class="flex flex-col gap-2">
          <div class="flex gap-3" v-for="item in categories">
            <Checkbox
              :id="item.id"
              @update:checked="set(item.id)"
              :checked="params['categories[]'].includes(item.id) ? true : false"
            />
            <label :for="item.id" class="block leading-[100%]">{{
              item.title
            }}</label>
          </div>
        </div>
      </div>

      <hr class="my-6" />
      <!-- Для нее -->
      <div class="flex gap-8">
        <div class="flex gap-2">
          <Checkbox id="men" />
          <label for="men" class="block leading-[100%]"> Для него </label>
        </div>

        <div class="flex gap-2">
          <Checkbox id="women" />
          <label for="women" class="block leading-[100%]"> Для нее </label>
        </div>
      </div>

      <div class="mt-auto">
        <Button @click="clear" class="w-full">Очистить</Button>
      </div>
      <!-- Группы продуктов -->
      <!-- <div class="">
        <h2 class="mb-4 font-semibold text-md mt-12">Группы продуктов</h2>
        <div class="flex flex-col gap-2">
          <div class="flex gap-3" v-for="item in groups">
            <Checkbox :id="item.id" />
            <label :for="item.id" class="block leading-[100%]">{{
              item.title
            }}</label>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style></style>
