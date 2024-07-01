import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { API_ROUTE } from "~/lib/constants";
const token = useCookie("auth.token");

export const collectionStore = defineStore("collectionStores", () => {
  const collections = ref({});
  const collectionsSingle = ref({});
  const loading = ref(false);

  const get = async () => {
    loading.value = true;
    await $fetch(API_ROUTE + "/admin/collections", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res: any) => {
      collections.value = res;
      loading.value = false;
    });
  };

  const show = async (slug: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + "/admin/collections/" + slug + "/show", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res: any) => {
      collectionsSingle.value = res;
      loading.value = false;
    });
  };

  const update = async (id: any, data: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/collections/${id}/update?_method=PATCH`, {
      body: data,
      method: "post",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((res: any) => {
        show(id);
        loading.value = false;
        toast.success("Коллекция обновлена");
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  return { collections, get, show, collectionsSingle, update };
});
