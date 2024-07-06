<script setup>
const props = defineProps({
  statusId: {},
});
</script>

<template>
  <div v-bind="$attrs" class="tag red" v-if="statusId == 1">Не оплачен</div>
  <div v-bind="$attrs" class="tag yellow" v-if="statusId == 2">В обработке</div>
  <div v-bind="$attrs" class="tag green" v-if="statusId == 3">Оплачен</div>
  <div v-bind="$attrs" class="tag green" v-if="statusId == 4">Отправлен</div>
  <div v-bind="$attrs" class="tag red" v-if="statusId == 5">Аннулирован</div>
  <div v-bind="$attrs" class="tag green" v-if="statusId == 6">
    Готов к выдаче
  </div>
  <div v-bild="$attrs" class="tag green" v-if="statusId == 7">Доставлен</div>
</template>

<style lang="scss" scoped>
.tag {
  @apply border rounded-md px-3 pt-[7px] pb-[8px] inline-block leading-[100%];
}

.red {
  @apply border-[#FBB1C4] text-[#D50B3E] bg-[#FEF0F4];
}

.green {
  @apply border-[#B2EECC] text-[#17663A] bg-[#EEFBF4];
}
.yellow {
  @apply border-[#FFDA85] text-[#8A6100] bg-[#FFF9EB];
}
</style>
