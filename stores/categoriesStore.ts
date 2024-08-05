import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { API_ROUTE } from "~/lib/constants";
const token = useCookie("auth.token");

export const categoryStore = defineStore("mycategoryStore", () => {
  const categories = ref();
  const category = ref();
  const loading = ref(false);

  const get = async (gender: any = "") => {
    await $fetch(API_ROUTE + `/admin/categories/${gender}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res) => (categories.value = res));
  };

  const getWomen = async () => {
    await $fetch(API_ROUTE + "/admin/categories/women", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res) => (categories.value = res));
  };

  const getMen = async () => {
    await $fetch(API_ROUTE + "/admin/categories/men", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res) => (categories.value = res));
  };

  const getOne = async (slug: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/categories/${slug}/show`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },

      onResponseError({ response }) {
        console.log(response?._data?.errors);
      },
    }).then((res) => {
      category.value = res;
      loading.value = false;
    });
  };

  const createNew = async (value: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + "/admin/categories/store", {
      method: "POST",
      body: value,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },

      onResponseError({ response }) {
        console.log(response?._data?.errors);

        toast.error("Ошибка создания категории ", {
          description: response?._data?.message
            ? response?._data?.message
            : "Такая категория уже существует",
        });
      },
    }).then((res: any) => {
      get();
      loading.value = false;
      toast.success("Категория успешно добавлена");
    });
  };

  const update = async (id: any, value: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/categories/${id}/update?_method=PATCH`, {
      method: "POST",
      body: value,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },

      onResponseError({ response }) {
        console.log(response?._data?.errors);

        toast.error("Ошибка обновления категории ", {
          description: response?._data?.message
            ? response?._data?.message
            : "Ошибка",
        });
      },
    }).then(() => {
      getOne(id);
      loading.value = false;
      toast.success("Категория успешно обновлена");
    });
  };

  const deleteItem = async (slug: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/categories/${slug}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },

      onResponseError({ response }) {
        console.log(response?._data?.errors);

        toast.error("Ошибка удаления категории ", {
          description: response?._data?.message,
        });
      },
    }).then((res: any) => {
      get();
      loading.value = false;
      toast.success("Категория успешно удалена");
    });
  };

  const createBanner = async (id: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/categories/${id}/banners/store`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },

      onResponseError({ response }) {
        console.log(response?._data?.errors);

        toast.error("Ошибка  ", {
          description: response?._data?.message
            ? response?._data?.message
            : "Ошибка",
        });
      },
    }).then(() => {
      getOne(id);
      loading.value = false;
      toast.success("Баннер создан!");
    });
  };

  const deleteBanner = async (categoryId: any, bannerId: any) => {
    loading.value = true;
    await $fetch(
      API_ROUTE + `/admin/categories/${categoryId}/banners/${bannerId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },

        onResponseError({ response }) {
          console.log(response?._data?.errors);

          toast.error("Ошибка удаления ", {
            description: response?._data?.message
              ? response?._data?.message
              : "Ошибка",
          });
        },
      }
    ).then(async () => {
      await getOne(categoryId);
      loading.value = false;
      toast.success("Баннер удален!");
    });
  };

  return {
    categories,
    deleteBanner,
    get,
    createNew,
    getOne,
    category,
    createBanner,
    deleteItem,
    loading,
    update,
    getWomen,
    getMen,
  };
});
