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
  <!-- <pre>

    {{ data.products }}
  </pre> -->
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
      <p>{{ data.order_num }}</p>
      <div class="ml-auto flex items-center gap-2">
        <div>01.02.2024</div>
        <div class="w-[1px] bg-gray-300 h-3"></div>
        <div>08:24</div>
      </div>
    </div>

    <div class="mt-4 h-[1px] bg-gray-300"></div>

    <div
      class="mt-4 text-[14px] leading-[100%] gap-4 grid grid-cols-1"
      v-if="data.client"
    >
      <div class="flex flex-col gap-3">
        <div class="font-medium">
          {{ data.client?.first_name }} {{ data.client?.last_name }}
        </div>
        <div>{{ data.client.phone }}</div>
        <div>{{ data.client.email }}</div>
      </div>

      <div class="flex flex-col gap-1">
        <div class="font-medium">{{ data.order_delivery_method.title }}</div>
        <div>
          {{ data?.profile_client_address?.index }}
          г. {{ data?.profile_client_address.locality }} ул.
          {{ data?.profile_client_address.street }}
          д. {{ data?.profile_client_address.house }}, кв.
          {{ data?.profile_client_address.flat }}
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <div class="font-medium">{{ data?.order_payment_method.title }}</div>
        <div>
          {{
            data?.comment_payment ? data?.comment_payment : "Комментариев нет"
          }}
        </div>
      </div>
    </div>

    <div class="mt-6">
      <div class="font-medium">Товары</div>
      <div class="bg-white px-4 py-3 mt-1 rounded-md flex flex-col gap-3">
        <div
          class="leading-[100%] flex"
          v-for="item in data?.products"
          :key="item.id"
        >
          <div>{{ item.title }} ({{ item.quantity }})</div>

          <div class="ml-auto">{{ item.price * item.quantity }} BYN</div>
        </div>

        <div class="mt-2 flex justify-end font-medium">
          Итого: {{ data.total_price }} BYN
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
