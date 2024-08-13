<script setup>
import { Check } from "lucide-vue-next";
import { toast } from "vue-sonner";
import Badge from "~/components/ui/badge/Badge.vue";
import Inner from "~/components/ui/Inner.vue";
import Title from "~/components/ui/Title.vue";
import UploadBtn from "~/components/ui/UploadBtn.vue";

const route = useRoute();
const slug = route.params.slug;
const orderRef = ref();

const { getOne, update, createBanner, changeProductOrder, deleteBanner } =
  categoryStore();
const { category, loading } = storeToRefs(categoryStore());

const currentBannerId = ref();

const setCurrenBannerId = (id) => {
  currentBannerId.value = id;
};

const updateCollectionRef = ref({
  title: "",
  is_active: 1,
  sort: 9,
  products: [],
  is_man: 0,
  is_woman: 0,
});

const updateCategory = () => {
  delete updateCollectionRef.value.sale;
  update(slug, updateCollectionRef.value);
};

await getOne(slug).then(() => {
  updateCollectionRef.value = category?.value?.data;
});

const uploadDesktopImage = async (e) => {
  loading.value = true;
  const files = e.target.files[0];
  let formData = new FormData();

  formData.append(`image`, files);

  await useApi(
    `/admin/categories/${slug}/banners/${currentBannerId.value}/update?_method=PATCH`,
    {
      method: "post",
      body: formData,
    }
  )
    .then(() => {
      getOne(slug);
      loading.value = false;
      toast.success("Файлы успешно загружены");
    })
    .catch((e) => {
      loading.value = false;
      toast.error(e);
    });
};

const uploadMobileImage = async (e) => {
  loading.value = true;
  const files = e.target.files[0];
  let formData = new FormData();

  formData.append(`image_mob`, files);

  await useApi(
    `/admin/categories/${slug}/banners/${currentBannerId.value}/update?_method=PATCH`,
    {
      method: "post",
      body: formData,
    }
  )
    .then(() => {
      getOne(slug);
      loading.value = false;
      toast.success("Файлы успешно загружены");
    })
    .catch((e) => {
      loading.value = false;
      toast.error(e);
    });
};

const newOrderHandler = async (productId, sort) => {
  await changeProductOrder(slug, sort, productId);
  await getOne(slug).then(() => {
    updateCollectionRef.value = category?.value?.data;
  });
};
</script>

<template>
  <Inner :class="{ 'opacity-20': loading }">
    <div class="flex items-center">
      <Title>{{ category?.data?.title }}</Title>

      <div class="ml-auto flex items-center gap-2">
        {{ useDateFormat(updateCollectionRef?.created_at) }}

        <NuxtLink
          href="/products/categories"
          class="border leading-[100%] pt-[12px] pb-[13px] px-4 rounded-md"
          >Назад</NuxtLink
        >
      </div>
    </div>

    <hr class="mt-6" />
    <section class="flex flex-col gap-4 mt-10">
      <div class="flex flex-col gap-2">
        <Label>Название </Label>
        <Input v-model="updateCollectionRef.title" />
      </div>

      <div class="flex gap-8">
        <div class="flex items-center leading-none">
          <input
            type="checkbox"
            v-model="updateCollectionRef.is_active"
            :false-value="0"
            id="is_active"
            :true-value="1"
          />
          <label for="is_active" class="block pl-2 cursor-pointer"
            >Активно</label
          >
        </div>

        <div class="flex items-center leading-none">
          <input
            type="checkbox"
            v-model="updateCollectionRef.is_man"
            :false-value="0"
            id="is_man"
            :true-value="1"
          />
          <label for="is_man" class="block pl-2 cursor-pointer">Мужская</label>
        </div>

        <div class="flex items-center leading-none">
          <input
            type="checkbox"
            v-model="updateCollectionRef.is_woman"
            :false-value="0"
            id="is_woman"
            :true-value="1"
          />
          <label for="is_woman" class="block pl-2 cursor-pointer"
            >Женская</label
          >
        </div>
      </div>
      <Button @click="updateCategory">Сохранить</Button>
    </section>

    <!-- Banners -->

    <section class="mt-10">
      <div class="flex items-center justify-between">
        <Title class="font-medium">Баннеры</Title>

        <Button @click="createBanner(slug)">Добавить баннер</Button>
      </div>

      <div class="flex flex-col gap-4 mt-6">
        <!-- Banner  -->
        <div
          class="relative gap-1 flex flex-col bprder border-b pb-4"
          v-for="item in category?.data?.category_banners"
        >
          <!-- Top -->
          <div class="flex w-full">
            <h2 class="font-medium">Баннер: {{ item.id }}</h2>

            <div class="ml-auto">
              <DeleteButton @click="deleteBanner(slug, item.id)" />
            </div>
          </div>

          <!-- Images -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h3 class="font-medium text-sm">ПК</h3>
              <div class="h-[400px] mt-2">
                <img
                  :src="item?.image"
                  class="object-cover h-full bg-gray-200 rounded-lg w-full"
                />
              </div>
              <UploadBtn
                class="mt-2"
                @change="uploadDesktopImage"
                @click="setCurrenBannerId(item.id)"
              />
            </div>
            <div>
              <h3 class="font-medium text-sm">Мобильный</h3>
              <div class="h-[400px] mt-2 bg-gray-200 rounded-lg">
                <img :src="item?.image_mob" class="object-cover h-full" />
              </div>
              <UploadBtn
                class="mt-2"
                @change="uploadMobileImage"
                @click="setCurrenBannerId(item.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section class="mt-8">
      <div class="flex flex-col gap-2">
        <div
          class="rounded-lg border p-2 pr-4 relative"
          v-for="item in updateCollectionRef.products"
          :key="item.id"
        >
          <div class="flex items-start gap-4">
            <div class="flex flex-col gap-1">
              <input
                type="text"
                v-model="item.sort"
                class="border w-10 h-10 text-center rounded-sm"
              />

              <button
                class="bg-primary flex items-center justify-center text-white w-10 h-10 rounded-sm"
                @click="newOrderHandler(item.id, item.sort)"
              >
                <Check size="14" />
              </button>
            </div>
            <img
              :src="item.product_files[0]?.file"
              alt=""
              class="w-20 h-20 rounded-sm object-cover"
            />

            <div class="flex flex-col gap-1">
              <NuxtLink
                class="text-md font-medium hover:text-primary"
                :to="`/products/${item.id}`"
                >{{ item.title }}</NuxtLink
              >

              <div class="flex gap-2 items-center text-sm text-gray-700">
                <div class="">{{ item.price }} BYN</div>
                <div class="w-[1px] bg-gray-500 h-4"></div>
                <div class="">{{ item.discounted_price }} BYN</div>
                <div class="w-[1px] bg-gray-500 h-4"></div>
                <div class=" ">SKU: {{ item.vendor_code }}</div>
              </div>

              <div class="text-sm">
                <p>Остаток: {{ item.product_quantity }} шт</p>
              </div>
            </div>

            <div class="ml-auto flex gap-2 items-start">
              <Badge class="" v-if="item.is_active">Активный</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Inner>
</template>

<style lang="scss" scoped></style>
