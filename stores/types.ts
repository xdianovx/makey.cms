import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { API_ROUTE } from "~/lib/constants";
const token = useCookie("auth.token");

export const typesStore = defineStore("myTypesStore", () => {
  const types = ref();
  const loading = ref(false);

  const get = async () => {
    await $fetch(API_ROUTE + "/admin/types", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res) => (types.value = res));
  };

  const create = async (body: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + "/admin/types/store", {
      method: "POST",
      body: body.value,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((res) => {
        get();
        toast.success("Материал успешно создан");
        loading.value = false;
      })
      .catch((e) => {
        toast.error("Такой материал уже существует");
      });
  };

  const remove = async (slug: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/types/${slug}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((res) => {
        get();
        toast.success("Тип успешно удален");
        loading.value = false;
      })
      .catch((e) => {
        toast.error("Что-то пошло не так");
      });
  };

  const edit = async (slug: any, values: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/types/${slug}/update?_method=PATCH`, {
      method: "POST",
      body: { ...values, category_id: 1 },
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((res) => {
        get();
        toast.success("Тип успешно обновлен");
        loading.value = false;
      })
      .catch((e) => {
        toast.error("Что-то пошло не так");
      });
  };

  return { types, get, create, remove, edit };
});
