<script setup>
import Inner from "~/components/ui/Inner.vue";
import Title from "~/components/ui/Title.vue";
import { Plus, Settings2, Trash } from "lucide-vue-next";
import { toast } from "vue-sonner";

const { get, remove } = productsGroupsStore();
const { groups, loading } = storeToRefs(productsGroupsStore());

get();

const deleteItem = (id) => {
  remove(id).then(() => {
    toast.error("Группа успешно удалена", {});
  });
};
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

        <div class="ml-auto">
          <Button
            variant="outline"
            class="py-2 border-red-700"
            @click="deleteItem(item.slug)"
          >
            <Trash width="16" class="text-red-700" />
          </Button>
        </div>
      </div>
    </div>

    <!-- <pre>{{ groups }}</pre> -->
  </Inner>
</template>

<style></style>
