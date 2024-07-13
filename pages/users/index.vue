<script setup>
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";

const { get } = usersStore();
const { users } = storeToRefs(usersStore());

await get();
</script>

<template>
  <Inner>
    <Title>Пользователи </Title>

    <div class="flex flex-col mt-5 gap-2">
      <div v-for="item in users" class="p-4 leading-[100%] border rounded-md">
        <div class="flex items-center gap-4">
          <p
            class="text-sm text-gray-700 rounded-full border py-1 px-2 bg-gray-200"
          >
            ID: {{ item.id }}
          </p>
          <p class="font-medium text-lg">Имя Фамилия</p>
          <p>Заказы: (12)</p>

          <p class="ml-auto">
            Зарегистирирован: {{ useDateFormat(item.created_at) }}
          </p>
        </div>

        <hr class="my-4" />

        <!-- <p class="font-medium">Контакты</p> -->
        <div class="flex mt-2 items-start gap-4">
          <div class="flex flex-col gap-2" v-if="item.email">
            <p>Email:</p>
            <NuxtLink :to="`emailto:${item.email}`">{{ item.email }}</NuxtLink>
          </div>

          <div class="flex flex-col gap-2">
            <p>Телефон:</p>
            <NuxtLink :to="`tel:${item.phone}`">{{ item.phone }}</NuxtLink>
          </div>
        </div>

        <!-- <Button class="mt-4">Перейти к пользователю</Button> -->

        <NuxtLink
          :to="`/users/${item.id}`"
          class="mt-4 bg-primary text-white rounded-md py-3 px-4 inline-block"
          >Перейти к пользователю</NuxtLink
        >
      </div>
    </div>
  </Inner>
</template>

<style lang="scss" scoped></style>
