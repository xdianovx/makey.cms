<script setup>
import { toast } from "vue-sonner";
import { DeleteButton } from "~/components/ui/button";
import Button from "~/components/ui/button/Button.vue";
import Inner from "~/components/ui/Inner.vue";
import Input from "~/components/ui/input/Input.vue";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import Title from "~/components/ui/Title.vue";
import UploadBtn from "~/components/ui/UploadBtn.vue";

definePageMeta({
  layout: "product-single",
});

const route = useRoute();
const slug = route.params.slug;
const currentBannerId = ref();

const { show, update, remove, addBanner } = collectionStore();
const { collectionsSingle, loading } = storeToRefs(collectionStore());

const setCurrenBannerId = (id) => {
  currentBannerId.value = id;
};

const updateCollection = () => {
  delete collectionRef.value.sale;
  update(slug, collectionRef.value);
};

const collectionRef = ref({});

const uploadedImages = ref([]);
const uploadedImagesPreview = ref([]);

const deleteItem = async (bannerId) => {
  await remove(slug, bannerId).then(() => {
    show(slug).then(() => {
      collectionRef.value = collectionsSingle?.value?.data;
    });
  });
};

const addItem = async () => {
  await addBanner(slug).then(() => {
    show(slug).then(() => {
      collectionRef.value = collectionsSingle?.value?.data;
    });
  });
};

const uploadDesktopImage = async (e) => {
  const files = e.target.files[0];
  let formData = new FormData();

  formData.append(`image`, files);

  await useApi(
    `/admin/collections/${slug}/banners/${currentBannerId.value}/update?_method=PATCH`,
    {
      method: "post",
      body: formData,
    }
  )
    .then(() => {
      show(slug).then(() => {
        collectionRef.value = collectionsSingle?.value?.data;
      });
      toast.success("Файлы успешно загружены");
    })
    .catch((e) => {
      toast.error(e);
    });
};

const uploadMobileImage = async (e) => {
  const files = e.target.files[0];
  let formData = new FormData();

  formData.append(`image_mob`, files);

  await useApi(
    `/admin/collections/${slug}/banners/${currentBannerId.value}/update?_method=PATCH`,
    {
      method: "post",
      body: formData,
    }
  )
    .then(() => {
      show(slug).then(() => {
        collectionRef.value = collectionsSingle?.value?.data;
      });
      toast.success("Файлы успешно загружены");
    })
    .catch((e) => {
      toast.error(e);
    });
};

show(slug).then(() => {
  collectionRef.value = collectionsSingle?.value?.data;
});
</script>

<template>
  <Inner :class="{ 'opacity-20': loading }">
    <div class="flex items-center">
      <Title>{{ collectionRef?.title }}</Title>

      <div class="ml-auto flex items-center gap-2">
        {{ useDateFormat(collectionsSingle.data?.created_at) }}

        <NuxtLink
          href="/products/collections"
          class="border leading-[100%] pt-[12px] pb-[13px] px-4 rounded-md"
          >Назад</NuxtLink
        >
      </div>
    </div>

    <hr class="mt-6" />

    <div class="mt-6">
      <section class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <Label>Название </Label>
          <Input v-model="collectionRef.title" />
        </div>

        <div class="flex flex-col gap-2">
          <Label>Описание</Label>
          <Textarea v-model="collectionRef.description" />
        </div>

        <div class="flex">
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="collectionRef.is_active"
              name=""
              id="is_active"
              :false-value="0"
              :true-value="1"
            />
            <label for="is_active" class="pl-2 leading-[100%] cursor-pointer"
              >Активно</label
            >
          </div>
        </div>
        <Button @click="updateCollection">Сохранить</Button>
      </section>

      <!-- Banners -->

      <section class="mt-10">
        <div class="flex items-center justify-between">
          <Title class="font-medium">Баннеры</Title>

          <Button @click="addItem(slug)">Добавить баннер</Button>
        </div>

        <div class="flex flex-col gap-4 mt-6">
          <!-- Banner  -->
          <div
            v-for="(media, idx) in collectionRef?.collection_banners"
            :key="media.id"
            class="relative gap-1 flex flex-col bprder border-b pb-4"
          >
            <!-- Top -->
            <div class="flex w-full">
              <h2 class="font-medium">Баннер: {{ idx + 1 }}</h2>

              <div class="ml-auto">
                <DeleteButton @click="deleteItem(media.id)" />
              </div>
            </div>

            <!-- Images -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h3 class="font-medium text-sm">ПК</h3>
                <div class="h-[400px] mt-2">
                  <img
                    :src="media?.image"
                    class="object-cover h-full bg-gray-200 rounded-lg w-full"
                  />
                </div>
                <UploadBtn
                  class="mt-2"
                  @change="uploadDesktopImage"
                  @click="setCurrenBannerId(media.id)"
                />
              </div>
              <div>
                <h3 class="font-medium text-sm">Мобильное</h3>
                <div class="h-[400px] mt-2 bg-gray-200 rounded-lg">
                  <img :src="media?.image_mob" class="object-cover h-full" />
                </div>
                <UploadBtn
                  class="mt-2"
                  @change="uploadMobileImage"
                  @click="setCurrenBannerId(media.id)"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Products -->
      <section class="mt-10">
        <Title v-if="collectionRef?.products?.length > 0">Товары</Title>
        <Title v-else>Нет товаров</Title>

        <div class="flex flex-col gap-2 mt-4">
          <SharedProductRow
            v-for="item in collectionRef?.products"
            :data="item"
            :key="item.id"
          />
        </div>
      </section>
    </div>
  </Inner>
</template>

<style lang="scss" scoped></style>
