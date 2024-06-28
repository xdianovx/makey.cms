import { defineStore } from "pinia";
import { API_ROUTE } from "~/lib/constants";
const token = useCookie("auth.token");

export const typesStore = defineStore("myTypesStore", () => {
  const types = ref();

  const get = async () => {
    await $fetch(API_ROUTE + "/admin/types", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res) => (types.value = res));
  };

  return { types, get };
});
