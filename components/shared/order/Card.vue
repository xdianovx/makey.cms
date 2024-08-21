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

const { getInvoice, updateStatus } = ordersStore();

const getInvoiceHandler = async (id) => {
  await getInvoice(id);
};

const changeStatusHandler = async (orderId, statusId) => {
  await updateStatus(orderId, statusId);
};
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

            <DropdownMenuItem @click="changeStatusHandler(data.id, 2)"
              >В обработке
            </DropdownMenuItem>
            <DropdownMenuItem @click="changeStatusHandler(data.id, 3)"
              >Оплачен
            </DropdownMenuItem>
            <DropdownMenuItem @click="changeStatusHandler(data.id, 4)"
              >Отправлен
            </DropdownMenuItem>
            <DropdownMenuItem @click="changeStatusHandler(data.id, 7)"
              >Доставлен
            </DropdownMenuItem>
            <DropdownMenuItem @click="changeStatusHandler(data.id, 5)"
              >Аннулирован
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="getInvoiceHandler(data.order_num)"
              >Рачпечатать чек
            </DropdownMenuItem>

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
        {{ data.created_time }}
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

    <!-- Оплата -->

    <div class="mt-4 flex flex-col gap-2">
      <p class="font-medium">Комментарий:</p>
      <p class="bg-white rounded-md p-2">
        {{ data?.comment_order ? data.comment_order : "Нет комментариев" }}
      </p>
    </div>
    <div class="mt-4 h-[1px] bg-gray-200"></div>
    <pre></pre>
    <!-- Товары -->
  </div>
</template>

<style lang="scss" scoped></style>
