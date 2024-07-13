<script setup>
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";

const { getUser } = usersStore();
const { user } = storeToRefs(usersStore());

const route = useRoute();
const slug = route.params.slug;

await getUser(slug);
</script>

<template>
  <Inner>
    <Title>Профиль пользователя: Тут имя и фамилия</Title>

    <div class="flex flex-col mt-8 bg-gray-100 items-start p-4 rounded-md">
      <div class="flex items-center gap-4 w-full">
        <div
          class="border bg-white inline-block rounded-full px-2 leading-[100%] py-1"
        >
          ID: {{ user.id }}
        </div>

        <p class="text-lg leading-[100%] font-medium">Имя Фамилия</p>
        <div class="ml-auto leading-[100%]">
          Дата регистрации: {{ useDateFormat(user.created_at) }}
        </div>
      </div>

      <div class="h-[1px] bg-gray-200 w-full mt-4"></div>

      <div class="mt-4">
        <div class="flex gap-4">
          <!-- Contact -->
          <div class="flex flex-col">
            <p class="font-medium">Почта:</p>
            <NuxtLink :to="`mailto:${user.email}`">
              {{ user.email }}
            </NuxtLink>
          </div>

          <div class="flex flex-col relative">
            <div class="font-medium flex items-center gap-1">
              <span
                class="bg-green-500 text-white rounded-full leading-[100%] w-4 h-4 inline-flex items-center justify-center"
                v-if="user?.phone_confirmed"
              ></span>
              <p>Телефон:</p>
            </div>
            <NuxtLink :to="`tel:${user.phone}`">
              {{ user.phone }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <Title>Заказы</Title>

      <div class="flex flex-col mt-4 bg-gray-100 items-start p-4 rounded-md">
        Тут будут все заказы
      </div>
    </div>
  </Inner>
</template>

<style lang="scss" scoped></style>
