<script setup>
import { Trash2 } from "lucide-vue-next";
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

const { show, update } = collectionStore();
const { collectionsSingle } = storeToRefs(collectionStore());

const updateCollection = () => {
  delete collectionRef.value.sale;
  update(slug, collectionRef.value);
};

const collectionRef = ref({});

show(slug).then(() => {
  collectionRef.value = collectionsSingle?.value?.data;
});

const uploadedImages = ref([]);
const uploadedImagesPreview = ref([]);

const uploadMultiImage = (e) => {
  const files = e.target.files;
  uploadedImages.value = files;

  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageUrl = event.target.result;
      uploadedImagesPreview.value.push(imageUrl);
    };
    reader.readAsDataURL(files[i]);
  }
};

// const uploadMedia = async () => {
//   let formData = new FormData();

//   for (let i = 0; i < uploadedImages.value?.length; i++) {
//     formData.append(`files[]`, uploadedImages.value[i]);
//   }

//   await useApi(`/admin/products/${slug}/product_files/store`, {
//     method: "post",
//     body: formData,
//   })
//     .then(() => {
//       getProduct(slug);
//       uploadedImagesPreview.value = [];
//       toast.success("Файлы успешно загружены");
//     })
//     .catch((e) => {
//       toast.error(e);
//     });
// };
</script>

<template>
  <Inner>
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

    <div class="">
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
        <div class="flex">
          <Title class="font-medium">Баннеры</Title>
        </div>

        <div class="flex flex-col gap-10 mt-6">
          <!--  -->
          <div
            v-for="media in collectionRef?.collection_banners"
            :key="media.id"
            class="relative gap-4 flex items-start"
          >
            <div class="h-full w-1/2">
              <p class="font-medium mb-1">Десктоп</p>
              <div class="rounded-md -hidden h-[320px]">
                <img :src="media.image" alt="" class="object-contain h-full" />
              </div>
            </div>

            <div class="h-full w-1/2">
              <p class="font-medium mb-1">Мобайл</p>
              <div class="rounded-md overflow-hidden h-[320px]">
                <img
                  :src="media.image_mob"
                  alt=""
                  class="object-contain h-full"
                />
              </div>
            </div>
            <!-- <div class="">
              <p class="font-medium">Десктоп</p>
              <img
                :src="media.image"
                alt=""
                class="w-auto object-contain h-full block mt-2 rounded-md"
              />
            </div>

            <div class="">
              <p class="font-medium">Мобильное</p>
              <img :src="media.image_mob" alt="" class="w-auto mt-2" />
            </div>-->
          </div>
          <!--  -->
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

    <!-- Banners -->
    <div>
      <!-- <UploadBtn @change.prevent="uploadMultiImage" />

      <div class="mt-2 flex flex-col gap-2 mb-4">
        <div
          v-for="(item, idx) in uploadedImagesPreview"
          :key="item"
          class="w-full overflow-hidden rounded-lg relative"
        >
          <img :src="item" class="block w-full" />

          <div class="absolute top-2 right-2 z-10">
            <button
              @click="uploadedImagesPreview.splice(idx, 1)"
              class="bg-white border rounded-md w-8 h-8 flex items-center justify-center"
            >
              <Trash2 width="16" class="text-red-700" />
            </button>
          </div>
        </div>

        <button
          @click="uploadMedia($event)"
          v-if="uploadedImagesPreview.length > 0"
          class="border pt-[13px] pb-[15px] px-2 leading-[100%] transition-colors ease-in-out duration-200 rounded-lg hover:bg-primary hover:text-white"
        >
          Сохранить изображения
        </button>
      </div> -->
    </div>
  </Inner>
</template>

<style lang="scss" scoped></style>
