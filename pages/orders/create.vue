<script setup>
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight, Plus, User } from "lucide-vue-next";
import Button from "~/components/ui/button/Button.vue";
import Checkbox from "~/components/ui/checkbox/Checkbox.vue";
import SearchInput from "~/components/ui/form/SearchInput.vue";
import Input from "~/components/ui/input/Input.vue";
import Label from "~/components/ui/label/Label.vue";
import Textarea from "~/components/ui/textarea/Textarea.vue";

const { getProducts } = productStoreStore();
const { products } = storeToRefs(productStoreStore());

const { get: getUsers, getUser } = usersStore();
const { users, user } = storeToRefs(usersStore());

const { storeOrder } = ordersStore();
const { storeOrderErrors } = storeToRefs(ordersStore());

const orderData = ref({
  status_id: 2,
  total_price: 0,
  client_profile_id: 0,
  client_data: {},
  comment_order: null,
  comment_payment: null,
  promocode_id: null,
  payment_method_id: 5,
  profile_client_address: {},
  delivery_method_id: 2,
  products: [],
});

const isProductsModalShow = ref(false);
const selectedProducts = ref([]);
const clientData = ref({
  id: null,
  name: "",
  email: "",
  phone: "",
  first_name: "",
  last_name: "asdasd",
});
const totalPriceRef = ref(0);
const checkedProducts = ref([]);
const productSearchRef = ref("");
const isUsersModalShow = ref(false);

const showProductsModal = async () => {
  isProductsModalShow.value = !isProductsModalShow.value;
  if (isProductsModalShow.value == true) await getProducts();

  selectedProducts.value = products.value.data;
};

const showUsersModal = async () => {
  isUsersModalShow.value = !isUsersModalShow.value;
  if (isUsersModalShow.value == true) await getUsers();
};

const searchProducts = () => {
  const normalizedSearchString = productSearchRef.value.toLowerCase();
  const filteredProducts = products.value.data.filter((product) =>
    product.title.toLowerCase().includes(normalizedSearchString)
  );

  selectedProducts.value = filteredProducts;
};

const addProductToCheckedProducts = (product) => {
  const index = checkedProducts.value.findIndex(
    (checkedProduct) => checkedProduct.id === product.id
  );

  if (index !== -1) {
    checkedProducts.value.splice(index, 1);
  } else {
    checkedProducts.value.push(product);
  }

  orderData.value.products = checkedProducts.value;
  calcProductCost();
};
const addUserToSelectedUser = async (user) => {
  clientData.value = user;
  orderData.value.client_profile_id = clientData.value.id;
  orderData.value.client_data = clientData.value;

  if (clientData?.value?.profile_client_addresses.length > 0) {
    orderData.value.profile_client_address =
      clientData?.value?.profile_client_addresses[0];
  } else {
    orderData.value.profile_client_address = {};
  }

  if (clientData.value.id) {
    await getUser(clientData.value.id);
  }
};
const isProductExistInCheckedProducts = (productId) => {
  return checkedProducts.value.some((product) => product.id === productId);
};

const clearCheckedProducts = () => {
  checkedProducts.value = [];
};

const calcProductCost = () => {
  const productsCost = orderData.value.products.reduce((acc, product) => {
    return acc + product.discounted_price;
  }, 0);
  totalPriceRef.value = productsCost;
  orderData.value.total_price = productsCost;
};

const createOrder = () => {
  storeOrder(orderData.value);
};
</script>

<template>
  <div>
    <Inner>
      <div class="flex items-center justify-between">
        <Title>Новый заказ</Title>
        <NuxtLink
          class="border inline-block leading-[100%] pt-[12px] pb-[13px] px-4 rounded-md"
          to="/orders"
        >
          Назад
        </NuxtLink>
      </div>

      <section class="mt-10">
        <div class="flex justify-between items-center">
          <Title tag="h1">Товары</Title>

          <div class="mt-10"></div>

          <button
            class="bg-black flex gap-2 items-center text-white rounded-md leading-[100%] py-3 px-4 hover:bg-black/80"
            @click="showProductsModal"
          >
            <Plus size="16" />
            <p>Добавить товар</p>
          </button>
        </div>
      </section>

      <!-- Выбранные товары старт -->
      <section class="mt-4">
        <div class="flex flex-col gap-2" v-if="checkedProducts.length > 0">
          <div
            class="flex items-center justify-between"
            v-for="item in checkedProducts"
            :key="item.id"
          >
            <div class="flex items-center gap-2">
              <div class="w-12 h-12 overflow-hidden rounded-sm">
                <img :src="item.product_files[0].file" alt="" />
              </div>
              <p class="font-medium text-md">{{ item.title }}</p>
            </div>

            <div class="ml-auto flex gap-4 items-center">
              <div>{{ item.discounted_price }} BYN</div>
              <Checkbox
                :checked="isProductExistInCheckedProducts(item.id)"
                @click="addProductToCheckedProducts(item)"
              />
            </div>
          </div>
        </div>
        <div v-else class="flex items-center justify-center">
          Нет выбранных товаров
        </div>
      </section>
      <!-- Выбранные товары конец -->

      <!-- Покупатель старт -->
      <section class="mt-8">
        <div class="bg-gray-100 p-4 rounded-md">
          <!-- Выбрать пользователя -->
          <div
            class="flex items-center cursor-pointer"
            v-if="!clientData?.id"
            @click="showUsersModal"
          >
            <div class="flex items-center gap-4">
              <User size="20" class="text-gray-500" />
              <p class="">Выбрать пользователя</p>
            </div>

            <div class="ml-auto">
              <ChevronRight size="20" class="text-gray-500" />
            </div>
          </div>

          <!-- Пользователь выбран -->
          <div
            class="flex items-center cursor-pointer"
            v-else
            @click="showUsersModal"
          >
            <div class="flex items-center gap-4">
              <p class="">{{ orderData.client_profile_id }}</p>
              <User size="20" class="text-gray-500" />
              <div class="flex gap-2">
                <p class="">{{ orderData.client_data?.first_name }}</p>
                <p class="">{{ orderData.client_data?.last_name }}</p>
              </div>
            </div>

            <div class="ml-auto flex items-center gap-4">
              <p class="">{{ orderData.client_data?.phone }}</p>
              <p class="">{{ orderData.client_data?.email }}</p>
              <p class="ml-auto">
                Зарегестирован:
                {{ useDateFormat(orderData.client_data?.created_at) }}
              </p>
              <ChevronRight size="20" class="text-gray-500" />
            </div>
          </div>
        </div>
      </section>
      <!-- Покупатель конец -->

      <!-- Контакты Старт -->
      <section class="mt-8">
        <Title tag="h2">Контактные данные</Title>
        <div class="bg-gray-100 h-[1px] mt-3"></div>

        <div class="grid grid-cols-4 gap-2 mt-6">
          <div class="flex flex-col gap-2">
            <Label>Фамилия</Label>
            <Input v-model="orderData.client_data.last_name" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Имя</Label>
            <Input v-model="orderData.client_data.first_name" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Телефон</Label>
            <Input type="tel" v-model="orderData.client_data.phone" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Почта</Label>
            <Input v-model="orderData.client_data.email" />
          </div>
        </div>
      </section>
      <!-- Контакты Конец -->

      <!-- Доставка Старт -->
      <section class="mt-8">
        <Title tag="h2">Доставка</Title>
        <div class="bg-gray-100 h-[1px] mt-3"></div>

        <div class="grid grid-cols-4 gap-x-2 gap-y-6 mt-6">
          <div class="flex flex-col gap-2">
            <Label>Способ доставки</Label>
            <Input disabled v-model="orderData.delivery_method_id" />
          </div>
          <div class="flex flex-col gap-2">
            <Label>Город</Label>
            <Input v-model="orderData.profile_client_address.locality" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Индекс</Label>
            <Input v-model="orderData.profile_client_address.index" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Улица</Label>
            <Input v-model="orderData.profile_client_address.street" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Дом</Label>
            <Input v-model="orderData.profile_client_address.house" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Квартира</Label>
            <Input v-model="orderData.profile_client_address.flat" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Этаж</Label>
            <Input v-model="orderData.profile_client_address.floor" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Подъезд</Label>
            <Input v-model="orderData.profile_client_address.entrance" />
          </div>
        </div>
      </section>
      <!-- Доставка Конец -->

      <!-- Оплата Старт -->
      <section class="mt-8">
        <Title tag="h2">Оплата</Title>
        <div class="bg-gray-100 h-[1px] mt-3"></div>

        <div class="grid grid-cols-2 gap-2 mt-6">
          <div class="flex flex-col gap-2">
            <Label>Способ оплаты</Label>
            <Input value="При получении" disabled placeholder="При получении" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Комментарий к оплате</Label>
            <Input v-model="orderData.comment_payment" />
          </div>
        </div>
      </section>
      <!-- Оплата Конец -->

      <!-- Комментарий Старт -->
      <section class="mt-8">
        <Title tag="h2">Комментарий к заказу</Title>
        <div class="bg-gray-100 h-[1px] mt-3"></div>

        <div class="mt-4">
          <Textarea v-model="orderData.comment_order" class="w-full"></Textarea>
        </div>
      </section>
      <!-- Комментарий Конец -->

      <!-- Стоимость Старт -->
      <section class="mt-8">
        <Title tag="h2">Стоимость</Title>

        <div class="mt-2">
          <div
            class="bg-gray-100 rounded-md py-4 px-6 flex items-center justify-between text-lg font-medium"
          >
            <p>Итого:</p>
            <div>
              <div>{{ totalPriceRef }} BYN</div>
            </div>
          </div>
        </div>
      </section>

      <pre></pre>
      <!-- Стоимость Конец -->
      <div class="bg-red-100 px-6 py-4 mt-6" v-if="storeOrderErrors?.errors">
        <div class="" v-for="item in storeOrderErrors?.errors">
          {{ item }}
        </div>
      </div>

      <Button class="w-full mt-6" @click="createOrder">Cохранить заказ</Button>
    </Inner>

    <!--  Modals -->
    <Dialog :open="isProductsModalShow" :onUpdate:open="showProductsModal">
      <DialogContent class="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Выбор товаров</DialogTitle>
        </DialogHeader>

        <SearchInput v-model="productSearchRef" @change="searchProducts" />

        <div className="mt-6 h-[300px] overflow-y-auto">
          <div class="flex-col flex gap-2">
            <!-- Product Item -->
            <div
              class="flex items-center justify-between cursor-pointer"
              @click="addProductToCheckedProducts(item)"
              v-for="item in selectedProducts"
              :key="item.id"
            >
              <div class="flex items-center gap-2">
                <div class="w-12 h-12 overflow-hidden rounded-sm">
                  <img :src="item.product_files[0].file" alt="" />
                </div>
                <h3 class="font-medium">{{ item.title }}</h3>
              </div>

              <div class="ml-auto pr-2">
                <Checkbox :checked="isProductExistInCheckedProducts(item.id)" />
              </div>
            </div>

            <!-- Product Item End-->
          </div>
        </div>

        <div className="flex w-full gap-2 mt-6">
          <Button
            class="w-full"
            variant="outline"
            @click="
              () => {
                isProductsModalShow = false;
                clearCheckedProducts();
              }
            "
            >Отмена</Button
          >
          <Button class="w-full" @click="isProductsModalShow = false"
            >Сохранить</Button
          >
        </div>
      </DialogContent>
    </Dialog>

    <!-- Users Modal -->
    <Dialog :open="isUsersModalShow" :onUpdate:open="showUsersModal">
      <DialogContent class="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Выбрать пользователя</DialogTitle>
        </DialogHeader>

        <SearchInput v-model="productSearchRef" @change="searchProducts" />

        <div className="mt-6 h-[300px] overflow-y-auto">
          <div class="flex-col flex gap-2">
            <div
              class="bg-gray-100 p-4 rounded-md flex items-center gap-4"
              @click="addUserToSelectedUser(item)"
              v-for="item in users"
              :key="item.id"
              :class="[
                item.profile_id === clientData?.profile_id
                  ? 'bg-primary text-white active group'
                  : '',
              ]"
            >
              <div class="flex items-center gap-2 grow">
                <User
                  size="16"
                  class="text-gray-500 group-[.active]:text-white"
                />
                <p>{{ item?.first_name }}</p>
                <p>{{ item?.last_name }}</p>
              </div>

              <p>{{ item?.email }}</p>
              <p>{{ item?.phone }}</p>
            </div>
          </div>
        </div>

        <div className="flex w-full gap-2 mt-6">
          <Button
            class="w-full"
            variant="outline"
            @click="
              () => {
                isUsersModalShow = false;
                clientData = {};
                orderData.profile_client_address = {};
              }
            "
            >Отмена</Button
          >
          <Button class="w-full" @click="isUsersModalShow = false"
            >Сохранить</Button
          >
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style lang="scss" scoped></style>
