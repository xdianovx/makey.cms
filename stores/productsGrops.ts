import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { API_ROUTE } from "~/lib/constants";
const token = useCookie("auth.token");

export const productsGroupsStore = defineStore("myProductsGroupsStore", () => {
  const groups = ref();
  const loading = ref(false);

  const get = async () => {
    loading.value = true;
    await $fetch(API_ROUTE + "/admin/products/groups_product", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res: any) => {
      groups.value = res;
      loading.value = false;
    });
  };

  const remove = async (slug: any) => {
    loading.value = true;
    await $fetch(
      API_ROUTE + "/admin/products/groups_product/" + slug + "/delete",
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    ).then((res: any) => {
      get();
      loading.value = false;
    });
  };

  const create = async (data: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + "/admin/products/groups_product/store", {
      method: "post",
      body: data,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res: any) => {
      get();
      loading.value = false;
      toast.success("Группа товаров успешно создана");
    });
  };

  return { groups, get, remove, loading, create };
});
