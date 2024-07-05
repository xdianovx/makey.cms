import { defineStore } from "pinia";
import { toast } from "vue-sonner";
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
    }).then((res: any) => {
      colors.value = res;
      loading.value = false;
    });
  };

  const createNew = async (value: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + "/admin/colors/store", {
      method: "POST",
      body: value,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },

      onResponseError({ response }) {
        console.log(response?._data?.errors);

        toast.error("Ошибка создания цвета ", {
          description: response?._data?.message
            ? response?._data?.message
            : "Такой цвет уже существует",
        });
      },
    }).then((res: any) => {
      get();
      loading.value = false;
      toast.success("Цвет успешно добавлен");
    });
  };

  const deleteItem = async (slug: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/colors/${slug}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },

      onResponseError({ response }) {
        console.log(response?._data?.errors);

        toast.error("Ошибка удаления цвета ", {
          description: response?._data?.message,
        });
      },
    }).then((res: any) => {
      get();
      loading.value = false;
      toast.success("Цвет успешно удален");
    });
  };

  const editItem = async (slug: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/colors/${slug}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },

      onResponseError({ response }) {
        console.log(response?._data?.errors);

        toast.error("Ошибка удаления цвета ", {
          description: response?._data?.message,
        });
      },
    }).then((res: any) => {
      get();
      loading.value = false;
      toast.success("Цвет успешно удален");
    });
  };

  return { colors, loading, get, createNew, deleteItem };
});
