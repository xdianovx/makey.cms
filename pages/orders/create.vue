<script setup>
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
</script>

<template>
  <div>
    <Inner>
      <div class="flex items-center justify-between">
        <Title>Новый заказ</Title>
        <NuxtLink
          class="border inline-block leading-[100%] pt-[12px] pb-[13px] px-4 rounded-md"
          to="/orders"
        >
          Назад
        </NuxtLink>
      </div>

      <section class="mt-10">
        <div class="flex justify-between items-center">
          <Title tag="h2">Добавить товары</Title>

          <button
            class="bg-black text-white rounded-md leading-[100%] py-3 px-4 hover:bg-black/80"
          >
            Добавить
          </button>
        </div>
      </section>
    </Inner>
  </div>
</template>

<style lang="scss" scoped></style>
