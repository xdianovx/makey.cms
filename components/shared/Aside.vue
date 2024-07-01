<script setup>
import {
  Boxes,
  Component,
  House,
  Layers3,
  ShoppingBag,
  StretchHorizontal,
  Waves,
} from "lucide-vue-next";
import AsideLink from "../ui/AsideLink.vue";
</script>

<template>
  <aside>
    <div class="p-5 border-r h-full flex flex-col gap-4">
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
        </div>
      </div>

      <hr />
    </div>
  </aside>
</template>
