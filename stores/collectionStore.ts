import { defineStore } from "pinia";
import { API_ROUTE } from "~/lib/constants";
const token = useCookie("auth.token");

export const collectionStore = defineStore("collectionStores", () => {
  const collections = ref({});
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

  return { collections, get };
});
