<script setup>
import Inner from "~/components/ui/Inner.vue";
import Title from "~/components/ui/Title.vue";
import { Plus, Settings2, Trash } from "lucide-vue-next";
import { toast } from "vue-sonner";
import Button from "~/components/ui/button/Button.vue";
import Input from "~/components/ui/input/Input.vue";
import Label from "~/components/ui/label/Label.vue";
import { DeleteButton, EditButton } from "~/components/ui/button";

const { get, remove, create } = productsGroupsStore();
const { groups, loading } = storeToRefs(productsGroupsStore());

const dataRef = ref({
  title: "",
});

const deleteItem = (id) => {
  remove(id).then(() => {
    toast.error("Группа успешно удалена", {});
  });
};

const createItem = async () => {
  if (dataRef.value.title.length > 0) {
    await create(dataRef.value);
  } else {
    toast.error("Введите название группы");
  }
};

get();
</script>

<template>
  <Inner>
    <div class="flex items-end">
      <Title>Группы товаров</Title>
      <div class="ml-auto">
        <Button> <Plus width="16" /></Button>
      </div>
    </div>

    <div class="flex flex-col gap-2 mt-10" :class="{ 'opacity-20': loading }">
      <div
        class="px-5 py-4 rounded-md border flex gap-2"
        v-for="item in groups"
        :key="item.id"
      >
        <div class="">
          <h2 class="font-medium">{{ item.title }}</h2>
          <div class="text-gray-700 text-sm">
            Товаров в группе: {{ item.products.length }}
          </div>
        </div>

        <div class="ml-auto gap-1 flex">
          <DeleteButton @click="deleteItem(item.slug)" />
          <EditButton />
        </div>
      </div>
    </div>

    <div class="section mt-8">
      <Title>Добавить новую группу</Title>

      <div class="flex flex-col mt-4">
        <div class="flex flex-col gap-2">
          <Label>Название материала</Label>
          <Input required v-model="dataRef.title" />
        </div>
        <Button class="mt-4" @click="createItem">Добавить</Button>
      </div>
    </div>

    <!-- <pre>{{ groups }}</pre> -->
  </Inner>
</template>

<style></style>
