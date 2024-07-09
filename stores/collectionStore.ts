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

  const create = async (data: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/collections/store`, {
      body: data,
      method: "post",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((res: any) => {
        loading.value = false;
        navigateTo(`/products/collections/${res.id}`);
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  const remove = async (collectionId: any, bannerId: any) => {
    loading.value = true;
    await $fetch(
      API_ROUTE +
        `/admin/collections/${collectionId}/banners/${bannerId}/delete`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
      .then((res: any) => {
        show(collectionId).then(() => {
          loading.value = false;
          toast.success("Баннер удален");
        });
      })
      .catch((e) => {
        toast.error(e);
        loading.value = false;
        toast.success("Ошибка удаления");
      });
  };

  const removeCollection = async (collectionId: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/collections/${collectionId}/delete`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((res: any) => {
        get().then(() => {
          loading.value = false;
          toast.success("Коллекция удалена");
        });
      })
      .catch((e) => {
        toast.error(e);
        loading.value = false;
        toast.success("Ошибка удаления");
      });
  };

  const addBanner = async (collectionId: any) => {
    loading.value = true;
    await $fetch(
      API_ROUTE + `/admin/collections/${collectionId}/banners/store`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
      .then((res: any) => {
        show(collectionId).then(() => {
          loading.value = false;
          toast.success("Баннер добавлен");
        });
      })
      .catch((e) => {
        toast.error(e);
        loading.value = false;
        toast.success("Ошибка удаления");
      });
  };

  return {
    collections,
    get,
    show,
    collectionsSingle,
    update,
    remove,
    loading,
    addBanner,
    create,
    removeCollection,
  };
});
