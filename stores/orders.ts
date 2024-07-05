import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { API_ROUTE } from "~/lib/constants";
const token = useCookie("auth.token");

export const ordersStore = defineStore("mycolorsStore", () => {
  const orders = ref({});
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

  return { orders, loading, get };
});
