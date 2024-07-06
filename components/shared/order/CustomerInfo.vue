<script setup>
import { CircleCheckBig } from "lucide-vue-next";

const props = defineProps(["data"]);
</script>

<template>
  <div v-bind="$attrs">
    <div class="flex">
      <Title tag="h2">Заказчик</Title>
      <div class="ml-auto"></div>
    </div>
    <div class="bg-gray-100 p-5 rounded-lg mt-2">
      <!--  -->
      <div class="flex leading-[100%] items-center gap-4">
        <h3 class="font-medium">
          {{ data?.first_name }} {{ data?.last_name }}
        </h3>

        <p>Всего заказов: {{ data?.orders_count }}</p>

        <NuxtLink :to="`/users/${data?.profile_id}`" class="underline ml-auto"
          >Профиль пользователя</NuxtLink
        >
      </div>

      <div class="flex mt-4 gap-4">
        <div class="flex gap-2 items-center leading-[100%]">
          <CircleCheckBig
            width="16"
            height="16"
            class="text-green-600"
            v-if="data?.phone_confirmed"
          />
          <p>{{ data?.phone }}</p>
        </div>

        <p class="">{{ data?.email }}</p>
      </div>

      <!-- <div>{{ order?.client }}</div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
