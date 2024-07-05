<script setup>
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import SearchInput from "~/components/ui/form/SearchInput.vue";

const tRef = ref("asd");
</script>

<template>
  <Inner>
    <div class="flex">
      <Title>Заказы</Title>
    </div>

    <SearchInput v-model="tRef" placeholder="Поиск по заказам" class="mt-8" />

    <!-- Orders Tab -->

    <div class="grid grid-cols-2 gap-4 mt-8">
      <SharedOrderCard />
      <SharedOrderCard />
      <SharedOrderCard />
    </div>
  </Inner>
</template>

<style lang="scss" scoped></style>
