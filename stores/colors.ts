import { defineStore } from "pinia";
import { API_ROUTE } from "~/lib/constants";
const token = useCookie("auth.token");

export const colorsStore = defineStore("mycolorsStore", () => {
  const colors = ref({});
  const loading = ref(false);

  const get = async () => {
    loading.value = true;
    await $fetch(API_ROUTE + "/admin/colors", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res) => {
      colors.value = res;
      loading.value = false;
    });
  };

  return { colors, get };
});
