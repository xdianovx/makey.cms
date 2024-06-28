<template>
  <div class="rounded-lg border p-2 pr-4 relative">
    <div class="flex items-start gap-4">
      <img
        :src="data.product_files[0]?.file"
        alt=""
        class="w-20 h-20 rounded-sm object-cover"
      />
      <div class="flex flex-col gap-1">
        <NuxtLink
          class="text-md font-medium hover:text-primary"
          :to="`/products/${data.id}`"
          >{{ data.title }}</NuxtLink
        >

        <div class="flex gap-2 items-center text-sm text-gray-700">
          <div class="">{{ data.price }} BYN</div>
          <div class="w-[1px] bg-gray-500 h-4"></div>
          <div class="">{{ data.discounted_price }} BYN</div>
          <div class="w-[1px] bg-gray-500 h-4"></div>
          <div class=" ">SKU: {{ data.vendor_code }}</div>
        </div>

        <div class="text-sm">
          <p>Остаток: {{ data.product_quantity }} шт</p>
        </div>
        <!-- <p>Для нее</p> -->
      </div>

      <div class="ml-auto flex gap-2 items-start">
        <Badge class="" v-if="data.is_active">Активный</Badge>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button class="p-0 w-8 h-8" variant="outline">
              <Settings2 width="14" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent class="w-[256px]">
            <DropdownMenuItem
              class="text-red-700 flex items-center gap-2"
              @click="deleteProduct(data.id)"
            >
              <Trash width="16" />
              <p>Удалить</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Settings, Settings2, Trash } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Badge from "../ui/badge/Badge.vue";

const { deleteProduct } = productStoreStore();

const props = defineProps(["data"]);
</script>

<style></style>
