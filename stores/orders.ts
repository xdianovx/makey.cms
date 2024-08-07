import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { API_ROUTE } from "~/lib/constants";
const token = useCookie("auth.token");

export const ordersStore = defineStore("myOrdersStore", () => {
  const orders = ref({});
  const order = ref({});
  const storeOrderErrors = ref({});
  const loading = ref(false);

  const get = async () => {
    loading.value = true;
    await $fetch(API_ROUTE + "/admin/orders", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res: any) => {
      orders.value = res;
      loading.value = false;
    });
  };

  const getOne = async (id: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/orders/${id}/show`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res: any) => {
      order.value = res;
      loading.value = false;
    });
  };

  const updateOrder = async (id: any, body: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/orders/${id}/update?_method=PATCH`, {
      method: "POST",
      body: body.value,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      onResponseError({ response }) {
        console.log(response?._data);

        toast.error("Ошибка обновления заказа");
      },
    }).then((res: any) => {
      order.value = res;
      loading.value = false;
      toast.success("Заказ успешно обновлен");
    });
  };

  const updateStatus = async (orderId: any, statusId: any) => {
    loading.value = true;
    await $fetch(
      API_ROUTE + `/admin/orders/${orderId}/change_status?_method=PATCH`,
      {
        method: "POST",
        body: {
          status_id: statusId,
        },
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        onResponseError({ response }) {
          console.log(response?._data);

          toast.error("Ошибка обновления статуса");
        },
      }
    ).then((res: any) => {
      order.value = res;
      loading.value = false;
      toast.success("Статус заказа успешно обновлен");
    });
  };

  const storeOrder = async (data: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/orders/store`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      onResponseError({ response }) {
        storeOrderErrors.value = response?._data;
        toast.error("Ошибка обновления статуса");
      },
    }).then((res: any) => {
      order.value = res;
      loading.value = false;
      toast.success("Статус заказа успешно обновлен");
    });
  };

  return {
    orders,
    order,
    loading,
    get,
    getOne,
    updateOrder,
    updateStatus,
    storeOrder,
    storeOrderErrors,
  };
});
