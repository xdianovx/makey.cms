<script setup>
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import CustomerInfo from "~/components/shared/order/CustomerInfo.vue";
import CustomerContacts from "~/components/shared/order/CustomerContacts.vue";
import CustomerPayment from "~/components/shared/order/CustomerPayment.vue";
import CustomerComment from "~/components/shared/order/CustomerComment.vue";
import CustomerProducts from "~/components/shared/order/CustomerProducts.vue";
import Status from "~/components/ui/order/Status.vue";

const route = useRoute();
const slug = route.params.id;

const { getOne, updateOrder } = ordersStore();
const { order, loading } = storeToRefs(ordersStore());

const orderRef = ref({
  status_id: 3,
  comment_order: "",
  comment_payment: "",
  promocode_id: 2,
  payment_method_id: 2,
  profile_client_address: {
    id: 1,
    type: "postal",
    locality: "Гродно",
    index: "24643",
    street: "Улица Дубко",
    house: "12",
    flat: "12",
    floor: "23",
    entrance: "3",
    created_at: "2024-07-03T19:25:57.000000Z",
  },
  delivery_method_id: 2,
});

await getOne(slug).then(() => {
  orderRef.value.status_id = 3;
  orderRef.value.comment_order = order.value.comment_order;

  orderRef.value.profile_client_address = {
    // id: 1,
    // type: "postal",
    locality: order.value?.profile_client_address?.locality,
    index: order.value?.profile_client_address?.index,
    street: order.value?.profile_client_address?.street,
    house: order.value?.profile_client_address?.house,
    flat: order.value?.profile_client_address?.flat,
    floor: order.value?.profile_client_address?.floor,
    entrance: order.value?.profile_client_address?.entrance,
    created_at: order.value?.profile_client_address?.created_at,
  };
});

const saveOrder = async () => {
  updateOrder(slug, orderRef);
};
</script>

<template>
  <Inner :class="{ 'opacity-20': loading }">
    <div class="flex">
      <Title>Заказ {{ order?.order_num }}</Title>
      <Status :status-id="order?.status.id" class="ml-auto" />
    </div>

    <div class="flex gap-4">
      <div class="">
        {{ new Date(order?.created_at).toLocaleString("ru", {}) }}
      </div>
      <div class="font-medium">{{ order?.total_price }} BYN</div>
    </div>

    <!-- Заказчик -->
    <CustomerInfo class="mt-8" v-if="order?.client" :data="order?.client" />

    <!-- Контакты заказчика -->
    <CustomerContacts
      v-model="orderRef"
      class="mt-10"
      v-if="order?.profile_client_address"
      :data="order?.profile_client_address"
    />

    <!-- Метод оплаты -->
    <CustomerPayment
      class="mt-10"
      v-if="order?.order_payment_method"
      :data="order?.order_payment_method"
    />

    <!-- Комментарий -->
    <CustomerComment class="mt-10" v-model="orderRef" />

    <!-- Товары -->
    <CustomerProducts class="mt-10" :data="order.products" />

    <Button class="w-full mt-4" @click="saveOrder">Обновить заказ</Button>
  </Inner>
</template>

<style lang="scss" scoped></style>
