import { defineStore } from "pinia";
import { API_ROUTE } from "~/lib/constants";
const token = useCookie("auth.token");

export const categoryStore = defineStore("mycategoryStore", () => {
  const categories = ref();

  const get = async () => {
    await $fetch(API_ROUTE + "/admin/categories", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res) => (categories.value = res));
  };

  return { categories, get };
});
