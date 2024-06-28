import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { API_ROUTE } from "~/lib/constants";
const token = useCookie("auth.token");

export const materialsStore = defineStore("myMaterialsStore", () => {
  const materials = ref({});
  const loading = ref(false);

  const get = async () => {
    loading.value = true;
    await $fetch(API_ROUTE + "/admin/materials", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res) => {
      materials.value = res;
      loading.value = false;
    });
  };

  const create = async (body: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + "/admin/materials/store", {
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
    await $fetch(API_ROUTE + `/admin/materials/${slug}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((res) => {
        get();
        toast.success("Материал успешно удален");
        loading.value = false;
      })
      .catch((e) => {
        toast.error("Что-то пошло не так");
      });
  };

  const edit = async (slug: any, values: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/materials/${slug}/update?_method=PATCH`, {
      method: "POST",
      body: values,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((res) => {
        get();
        toast.success("Материал успешно обновлен");
        loading.value = false;
      })
      .catch((e) => {
        toast.error("Что-то пошло не так");
      });
  };

  return { materials, create, get, remove, edit };
});
