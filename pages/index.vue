<script setup>
const { products } = storeToRefs(productStoreStore());
const { getProducts } = productStoreStore();

getProducts();
</script>

<template>
  <div></div>
</template>

<style></style>
