<script setup>
import {
  Box,
  Boxes,
  Component,
  House,
  Layers3,
  Palette,
  ShoppingBag,
  StretchHorizontal,
  User,
  Waves,
} from "lucide-vue-next";
import AsideLink from "../ui/AsideLink.vue";
</script>

<template>
  <aside class="">
    <div class="p-5 border-r sticky top-0 h-full flex flex-col gap-4">
      <AsideLink link="/" text="Главная">
        <House width="16" class="group-hover:text-primary" />
      </AsideLink>

      <hr />
      <div class="flex flex-col">
        <AsideLink link="/products" text="Продукты">
          <ShoppingBag width="16" class="group-hover:text-primary" />
        </AsideLink>

        <div class="pl-6 mt-2 flex gap-1 flex-col">
          <AsideLink link="/products/categories" text="Категории">
            <StretchHorizontal width="16" class="group-hover:text-primary" />
          </AsideLink>

          <AsideLink link="/products/groups" text="Группы товаров">
            <Component width="16" class="group-hover:text-primary" />
          </AsideLink>

          <AsideLink link="/products/types" text="Типы товаров">
            <Layers3 width="16" class="group-hover:text-primary" />
          </AsideLink>

          <AsideLink link="/products/collections" text="Коллекции">
            <Boxes width="16" class="group-hover:text-primary" />
          </AsideLink>

          <AsideLink link="/products/materials" text="Материалы">
            <Waves width="16" class="group-hover:text-primary" />
          </AsideLink>

          <AsideLink link="/products/colors" text="Цвета">
            <Palette width="16" class="group-hover:text-primary" />
          </AsideLink>
        </div>
      </div>

      <hr />

      <div class="flex flex-col">
        <AsideLink link="/orders" text="Заказы">
          <Box width="16" class="group-hover:text-primary" />
        </AsideLink>

        <!-- <div class="pl-6 mt-2 flex gap-1 flex-col">
          <AsideLink link="/products/categories" text="Категории">
            <StretchHorizontal width="16" class="group-hover:text-primary" />
          </AsideLink>
        </div> -->
      </div>

      <hr />

      <div class="flex flex-col">
        <AsideLink link="/users" text="Пользователи">
          <User width="16" class="group-hover:text-primary" />
        </AsideLink>

        <!-- <div class="pl-6 mt-2 flex gap-1 flex-col">
          <AsideLink link="/products/categories" text="Категории">
            <StretchHorizontal width="16" class="group-hover:text-primary" />
          </AsideLink>
        </div> -->
      </div>
      <hr />
    </div>
  </aside>
</template>
