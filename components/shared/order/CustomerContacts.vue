<script setup>
import Title from "@/components/ui/Title";
const props = defineProps(["data"]);
const model = defineModel();
</script>

<template>
  <div class="" v-bind="$attrs">
    <Title tag="h2">Адрес доставки</Title>

    <div class="bg-gray-200 h-[1px] mt-2"></div>

    <div class="mt-4 grid grid-cols-4 gap-4">
      <div>
        <p class="font-medium text-sm">Город</p>
        <Input class="mt-1" v-model="model.profile_client_address.locality" />
      </div>

      <div>
        <p class="font-medium text-sm">Индекс</p>
        <Input class="mt-1" v-model="model.profile_client_address.index" />
      </div>

      <div>
        <p class="font-medium text-sm">Улица</p>
        <Input class="mt-1" v-model="model.profile_client_address.street" />
      </div>

      <div>
        <p class="font-medium text-sm">Дом</p>
        <Input class="mt-1" v-model="model.profile_client_address.house" />
      </div>

      <div>
        <p class="font-medium text-sm">Квартира</p>
        <Input class="mt-1" v-model="model.profile_client_address.flat" />
      </div>

      <div>
        <p class="font-medium text-sm">Этаж</p>
        <Input class="mt-1" v-model="model.profile_client_address.floor" />
      </div>

      <div>
        <p class="font-medium text-sm">Подъезд</p>
        <Input class="mt-1" v-model="model.profile_client_address.entrance" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
