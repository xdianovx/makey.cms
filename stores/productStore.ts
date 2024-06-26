import { defineStore } from "pinia";
import { API_ROUTE } from "~/lib/constants";
const token = useCookie("auth.token");
import { watchDebounced } from "@vueuse/core";
import { useRouteParams } from "@vueuse/router";

export const productStoreStore = defineStore("myProductStoreStore", () => {
  const route = useRoute();
  const router = useRouter();
  const products = ref();
  const isLoading = ref(false);
  const params = ref({
    search: route.query.search ? route.query.search : "",
    "categories[]": route.query["categories[]"]
      ? [...route.query["categories[]"]].map((i) => +i)
      : [],
    is_men: "",
    is_women: "",
  });

  watch(
    () => params.value,
    (s) => {
      router.push({
        path: "/products",
        query: {
          search: s.search,
          "categories[]": s["categories[]"],
          is_men: s.is_men,
          is_women: s.is_women,
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

  return { products, getProducts, isLoading, filterProducts, params };
});
