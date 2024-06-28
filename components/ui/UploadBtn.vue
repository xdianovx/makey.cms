<template>
  <div class="upload-btn bg-primary rounded-lg">
    <span>Загрузить медиа</span>
    <input type="file" multiple />
  </div>
</template>

<script setup></script>

<style scoped>
.upload-btn {
  position: relative;
  text-align: center;

  span {
    position: relative;
    z-index: 0;
    display: inline-block;
    width: 100%;
    cursor: pointer;
    color: #fff;
    padding: 10px 0;
  }

  input {
    display: inline-block;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }
}
</style>
