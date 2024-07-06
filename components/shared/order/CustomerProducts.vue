<script setup>
import Title from "@/components/ui/Title";
const props = defineProps(["data"]);
</script>

<template>
  <div v-bind="$attrs">
    <Title tag="h2">Товары</Title>

    <div class="bg-gray-200 h-[1px] mt-2"></div>
    <div class="mt-4 flex flex-col gap-2">
      <div
        class="bg border border-gray-200 p-2 rounded-md flex gap-4"
        v-for="item in data"
      >
        <div class="w-20 h-20 rounded-sm overflow-hidden">
          <img
            :src="item.product_files[0].file"
            class="w-full h-full object-cover block"
            alt=""
          />
        </div>

        <div class="">
          <h3 class="font-medium text-md">{{ item.title }}</h3>
          <p>{{ item.vendor_code }}</p>

          <div class="flex gap-2">
            <p class="font-medium">{{ item.price }} BYN</p>
            <p>{{ item.colors[0]?.title }}</p>
            <p>Количество: {{ item.quantity }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
