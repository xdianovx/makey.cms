import { defineStore } from "pinia";
import { API_ROUTE } from "~/lib/constants";
const token = useCookie("auth.token");
import { watchDebounced } from "@vueuse/core";
import { useRouteParams } from "@vueuse/router";
import { toast } from "vue-sonner";

export const productStoreStore = defineStore("myProductStoreStore", () => {
  const route = useRoute();
  const router = useRouter();
  const products = ref();
  const product = ref();
  const isLoading = ref(false);
  const params = ref({
    search: route.query.search ? route.query.search : "",
    "categories[]": route.query["categories[]"]
      ? [...route.query["categories[]"]].map((i) => +i)
      : [],
    // is_man: 1,
    // is_woman: 1,
    page: 1,
  });

  watch(
    () => params.value,
    (s) => {
      router.push({
        path: "/products",
        query: {
          search: s.search,
          "categories[]": s["categories[]"],
          // is_man: s.is_man,
          // is_woman: s.is_woman,
          page: s.page,
        },
      });

      filterProducts(params.value);
    },
    { deep: true }
  );

  watch(router, () => {
    watchDebounced(
      () => params.value?.search,
      () => {
        filterProducts(params.value);
      },
      { debounce: 200, maxWait: 5000 }
    );
  });

  const getProducts = async () => {
    await $fetch(API_ROUTE + "/admin/products", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res) => (products.value = res));
  };

  const getProduct = async (slug: string) => {
    await $fetch(API_ROUTE + `/admin/products/${slug}/show`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res) => (product.value = res));
  };

  const filterProducts = async (value: any) => {
    isLoading.value = true;
    await $fetch(API_ROUTE + "/admin/products", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      params: value,
    }).then((res) => {
      products.value = res;
      isLoading.value = false;
    });
  };

  const changeMainImage = async (slug: string, imageId: any) => {
    isLoading.value = true;
    await $fetch(
      API_ROUTE +
        `/admin/products/${slug}/product_files/${imageId}/assign_cover?_method=PATCH`,
      {
        method: "post",
        body: { is_cover: 1 },
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    ).then((res) => {
      getProduct(slug);
      isLoading.value = false;
    });
  };

  const createProduct = async (body: any) => {
    isLoading.value = true;

    await $fetch(API_ROUTE + "/admin/products/store", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      method: "POST",
      body: body.value,
    }).then((res) => {
      console.log(res, "asdasdasd");
      product.value = res;
      isLoading.value = false;
    });
  };

  const updateProduct = async (id: any, body: any) => {
    isLoading.value = true;
    await $fetch(API_ROUTE + `/admin/products/${id}/update?_method=PATCH`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      method: "POST",
      body: body.value,
    }).then((res) => {
      products.value = res;
      isLoading.value = false;
    });
  };

  const deleteProduct = async (id: any) => {
    isLoading.value = true;
    await $fetch(API_ROUTE + `/admin/products/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      method: "DELETE",
    })
      .then((res) => {
        getProducts().then(() => {
          isLoading.value = false;
          toast.success("Товар удален");
        });
      })
      .catch(() => {
        isLoading.value = false;
        toast.error("Что-то пошло не так");
      });
  };

  const updateProductSort = async (id: any, sort: any) => {
    isLoading.value = true;
    await $fetch(API_ROUTE + `/admin/products/${id}/change_order_products`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: { sort: sort },
      method: "POST",
    })
      .then((res) => {
        products.value = res;
        isLoading.value = false;
      })
      .catch(() => {
        isLoading.value = false;
        toast.error("Что-то пошло не так");
      });
  };

  const deleteImage = async (productId: any, imageId: any) => {
    isLoading.value = true;
    await $fetch(
      API_ROUTE +
        `/admin/products/${productId}/product_files/${imageId}/delete`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        method: "DELETE",
      }
    )
      .then((res) => {
        getProduct(productId);
        toast.success("Файл удален");
      })
      .catch(() => {
        toast.error("Что-то пошло не так");
      });
  };

  return {
    products,
    deleteImage,
    product,
    deleteProduct,
    getProduct,
    getProducts,
    isLoading,
    filterProducts,
    params,
    changeMainImage,
    createProduct,
    updateProduct,
    updateProductSort,
  };
});
