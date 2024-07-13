import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { API_ROUTE } from "~/lib/constants";
const token = useCookie("auth.token");

export const usersStore = defineStore("myUsersStoreStore", () => {
  const users = ref({});
  const user = ref({});
  const loading = ref(false);

  const get = async () => {
    loading.value = true;
    await $fetch(API_ROUTE + "/admin/users/clients", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res: any) => {
      users.value = res;
      loading.value = false;
    });
  };

  const getUser = async (id: any) => {
    loading.value = true;
    await $fetch(API_ROUTE + `/admin/users/clients/${id}/show`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res: any) => {
      user.value = res;
      loading.value = false;
    });
  };

  return { user, users, get, getUser };
});
