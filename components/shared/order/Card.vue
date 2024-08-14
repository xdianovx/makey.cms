<script setup>
import Status from "../../ui/order/Status.vue";
import MenuButton from "../../ui/button/Menu.vue";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, Trash, User } from "lucide-vue-next";

const props = defineProps(["data"]);
</script>

<template>
  <div class="rounded-lg bg-gray-100 p-4">
    <div class="flex">
      <Status :status-id="data.status?.id" />

      <div class="ml-auto flex gap-4 items-center">
        <div class="text-red-600 leading-[100%]">
          {{ data.total_price }} BYN
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuButton class="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <NuxtLink
                :to="`/orders/${data?.id}`"
                class="flex gap-2 items-center"
              >
                <EditIcon width="16" />
                <span>Редактировать</span>
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NuxtLink
                :to="`/users/${data?.client}`"
                class="flex gap-2 items-center"
              >
                <User width="16" />
                <span>Перейти к пользователю</span>
              </NuxtLink>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Изменить статус</DropdownMenuLabel>
            <DropdownMenuItem>В ожидании </DropdownMenuItem>
            <DropdownMenuItem>В обработке </DropdownMenuItem>
            <DropdownMenuItem>Оплачен </DropdownMenuItem>
            <DropdownMenuItem>Отправлен </DropdownMenuItem>
            <DropdownMenuItem>Доставлен </DropdownMenuItem>
            <DropdownMenuItem>Аннулирован </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div class="flex gap-2 items-center text-red-500 cursor-pointer">
                <Trash width="16" />
                <span>Отменить заказ</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <div class="mt-4 flex text-gray-500 text-[14px]">
      <NuxtLink :to="`/orders/${data?.id}`" class="hover:text-red-500">
        <p>{{ data.order_num }}</p>
      </NuxtLink>

      <div class="ml-auto flex items-center gap-2">
        <div>{{ useDateFormat(data.created_at) }}</div>
        <!-- <div class="w-[1px] bg-gray-200 h-3"></div> -->
        <!-- <div>08:24</div> -->
      </div>
    </div>

    <div class="mt-4 h-[1px] bg-gray-200"></div>

    <!-- Получатель -->
    <div class="flex items-center gap-2 mt-4">
      <div class="flex items-center gap-1">
        <p>{{ data.client_data?.first_name }}</p>
        <p>{{ data.client_data?.last_name }}</p>
      </div>
      <div class="ml-auto flex items-center gap-4">
        <p>{{ data.client_data?.phone }}</p>
        <p>{{ data.client_data?.email }}</p>
      </div>
    </div>

    <div class="mt-4 h-[1px] bg-gray-200"></div>

    <!-- Адрес -->
    <div class="flex items-center gap-2 mt-4">
      <div class="flex items-center gap-1">
        <div>
          <div class="flex gap-2">
            <p class="font-medium">Индекс:</p>
            <p>{{ data.profile_client_address?.index }}</p>
          </div>
          <div class="flex gap-2">
            <p class="font-medium">Город:</p>
            <p>{{ data.profile_client_address?.locality }}</p>
          </div>

          <div class="flex gap-2">
            <p class="font-medium">Адрес:</p>
            <p>
              {{ data.profile_client_address?.street }}
              д.{{ data.profile_client_address?.house }} кв.
              {{ data.profile_client_address?.flat }}
              этаж: {{ data.profile_client_address?.floor }} вход:
              {{ data.profile_client_address?.entrance }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 h-[1px] bg-gray-200"></div>

    <!-- Доставка -->
    <div class="flex items-center gap-2 mt-4">
      <div class="flex items-center gap-1">
        <div>
          <div class="flex gap-2">
            <p class="font-medium">Тип доставки:</p>
            <p>{{ data.order_delivery_method?.title }}</p>
          </div>
          <div class="flex gap-2">
            <p class="font-medium">Стоимость:</p>
            <p>{{ data.order_delivery_method?.price }} BYN</p>
          </div>
          <div class="flex gap-2">
            <p class="font-medium">Описание:</p>
            <p>{{ data.order_delivery_method?.description }} BYN</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 h-[1px] bg-gray-200"></div>

    <!-- Оплата -->

    <div class="flex items-center gap-2 mt-4">
      <div class="flex items-center gap-1">
        <div>
          <div class="flex gap-2">
            <p class="font-medium">Тип оплаты:</p>
            <p>{{ data.order_payment_method?.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 h-[1px] bg-gray-200"></div>

    <div class="mt-4 flex flex-col gap-2">
      <p class="font-medium">Комментарий:</p>
      <p class="bg-white rounded-md p-2">
        {{ data?.comment_order ? data.comment_order : "Нет комментариев" }}
      </p>
    </div>
    <div class="mt-4 h-[1px] bg-gray-200"></div>

    <!-- Товары -->
    <div class="mt-4">
      <div class="font-medium">Товары</div>
      <div class="bg-white px-4 py-3 mt-2 rounded-md flex flex-col gap-3">
        <div
          class="leading-[100%] flex"
          v-for="item in data?.products"
          :key="item.id"
        >
          <div>{{ item.title }} ({{ item.quantity ? item.quantity : 1 }})</div>

          <div class="ml-auto">{{ item.price }} BYN</div>
        </div>

        <div class="mt-2 flex justify-end font-medium">
          Итого: {{ data.total_price }} BYN
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
