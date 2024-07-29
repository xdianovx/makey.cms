<script setup>
import { Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import Badge from "~/components/ui/badge/Badge.vue";
import Inner from "~/components/ui/Inner.vue";
import Title from "~/components/ui/Title.vue";
import { Textarea } from "@/components/ui/textarea";
import Label from "~/components/ui/label/Label.vue";
import Input from "~/components/ui/input/Input.vue";
import UploadBtn from "~/components/ui/UploadBtn.vue";

definePageMeta({
  layout: "product-single",
});

const route = useRoute();
const slug = route.params.slug;

const {
  getProduct,
  changeMainImage,
  updateProductSort,
  updateProduct,
  deleteImage,
} = productStoreStore();
const { get: getCategories } = categoryStore();
const { get: getCollections } = collectionStore();
const { get: getTypes } = typesStore();
const { get: getGroups } = productsGroupsStore();
const { get: getMaterials } = materialsStore();
const { get: getColors } = colorsStore();

const { product } = storeToRefs(productStoreStore());
const { categories } = storeToRefs(categoryStore());
const { collections } = storeToRefs(collectionStore());
const { types } = storeToRefs(typesStore());
const { groups } = storeToRefs(productsGroupsStore());
const { materials } = storeToRefs(materialsStore());
const { colors } = storeToRefs(colorsStore());

const productRef = ref({
  description: "",
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

const uploadMedia = async () => {
  let formData = new FormData();

  for (let i = 0; i < uploadedImages.value?.length; i++) {
    formData.append(`files[]`, uploadedImages.value[i]);
  }

  await useApi(`/admin/products/${slug}/product_files/store`, {
    method: "post",
    body: formData,
  })
    .then(() => {
      getProduct(slug);
      uploadedImagesPreview.value = [];
      toast.success("Файлы успешно загружены");
    })
    .catch((e) => {
      toast.error(e);
    });
};

const makePoster = (id) => {
  changeMainImage(slug, id).then(() => {
    toast.success("Обложка успешно изменена");
  });
};

const set = (id) => {
  if (productRef.value["materials"]?.includes(id)) {
    productRef.value["materials"].splice(
      productRef.value["materials"].indexOf(id),
      1
    );
  } else {
    productRef.value["materials"]?.push(id);
  }
};

const setColors = (id) => {
  if (productRef.value["colors"]?.includes(id)) {
    productRef.value["colors"].splice(
      productRef.value["colors"].indexOf(id),
      1
    );
  } else {
    productRef.value["colors"]?.push(id);
  }
};

const storeProduct = async () => {
  const res = await updateProduct(slug, productRef)
    .then(() => {
      toast.success("Товар успешно сохранен");
    })
    .catch((e) => {
      toast.error("Что-то пошло не так" + e);
    });
};

const newSortValue = ref();
newSortValue.value = product.value?.sort;

getProduct(slug).then((res) => {
  productRef.value = product.value;
  newSortValue.value = product.value?.sort;
});
getCategories();
getCollections();
getTypes();
getGroups();
getMaterials();
getColors();
</script>

<template>
  <Inner>
    <div class="flex items-center">
      <Title>{{ product?.title }}</Title>
      <div class="ml-auto text-gray-700 text-sm">
        <div>Создан: {{ useDateFormat(product?.created_at) }}</div>
        <div v-if="product?.updated_at">
          Обновлен: {{ useDateFormat(product?.updated_at) }}
        </div>
      </div>
    </div>

    <div class="flex mt-10 gap-2">
      <Input
        label="Порядковый номер:"
        v-model="newSortValue"
        :value="newSortValue"
        type="number"
      />
      <Button
        class="ml-auto"
        @click="updateProductSort(product?.id, newSortValue)"
        >Изменить очередность</Button
      >
    </div>

    <div class="grid grid-cols-[1fr_380px] gap-4 pb-10 mt-10">
      <div class="flex flex-col gap-8">
        <!-- Каталог -->
        <div class="grid grid-cols-3 gap-2">
          <!-- Cats -->
          <div class="flex flex-col gap-2">
            <Label>Категория</Label>
            <Select v-model="productRef.category_id">
              <SelectTrigger class="leading-[100%]">
                <SelectValue :placeholder="productRef.category_id" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem :value="item.id" v-for="item in categories">{{
                    item.title
                  }}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <!-- Collections -->
          <div class="flex flex-col gap-2">
            <Label>Коллекция</Label>
            <Select v-model="productRef.collection_id">
              <SelectTrigger class="leading-[100%]">
                <SelectValue :placeholder="productRef.collection_id" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem :value="item.id" v-for="item in collections">{{
                    item.title
                  }}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <!-- Types -->
          <div class="flex flex-col gap-2">
            <Label>Тип</Label>
            <Select v-model="productRef.type_id">
              <SelectTrigger class="leading-[100%]">
                <SelectValue
                  :placeholder="
                    productRef.type_id ? productRef.type_id : 'Выберите тип'
                  "
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem :value="item.id" v-for="item in types">{{
                    item.title
                  }}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="flex gap-2">
          <div class="flex gap-6 items-center">
            <div class="flex items-center">
              <input
                type="checkbox"
                v-model="productRef.is_woman"
                name=""
                id="is_woman"
                :false-value="0"
                :true-value="1"
              />

              <label for="is_woman" class="pl-2 leading-none cursor-pointer"
                >Для неё</label
              >
            </div>

            <div class="flex items-center">
              <input
                type="checkbox"
                v-model="productRef.is_man"
                name=""
                id="is_man"
                :false-value="0"
                :true-value="1"
              />
              <label for="is_man" class="pl-2 leading-none cursor-pointer"
                >Для него</label
              >
            </div>

            <div class="w-[1px] h-[18px] bg-slate-500"></div>

            <div class="flex items-center">
              <input
                type="checkbox"
                v-model="productRef.is_active"
                name=""
                id="is_active"
                :false-value="0"
                :true-value="1"
              />
              <label for="is_active" class="pl-2 leading-none cursor-pointer"
                >Активный</label
              >
            </div>

            <div class="flex items-center">
              <input
                type="checkbox"
                v-model="productRef.is_new"
                name=""
                id="is_new"
                :false-value="0"
                :true-value="1"
              />
              <label for="is_new" class="pl-2 leading-none cursor-pointer"
                >Новинка</label
              >
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                v-model="productRef.is_gift"
                name=""
                id="is_gift"
                :false-value="0"
                :true-value="1"
              />
              <label for="is_gift" class="pl-2 leading-none cursor-pointer"
                >Подарок</label
              >
            </div>
          </div>
        </div>

        <hr />
        <!-- Назвагние -->
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <Label>Группа товаров</Label>
            <Select v-model="productRef.group_product_id">
              <SelectTrigger class="leading-[100%]">
                <SelectValue
                  :placeholder="
                    productRef.group_product_id
                      ? productRef.group_product_id
                      : 'Выбрать'
                  "
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem :value="item.id" v-for="item in groups">{{
                    item.title
                  }}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col gap-2">
            <Label>Название товара</Label>
            <Input v-model="productRef.title" />
          </div>
          <div class="flex flex-col gap-2">
            <Label>Мета-тег</Label>
            <Input v-model="productRef.meta_tag" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Описание товара</Label>
            <Textarea v-model="productRef.description" rows="10" />
          </div>
        </div>

        <hr />

        <div class="grid grid-cols-4 gap-x-2 gap-y-4">
          <div class="flex flex-col gap-2">
            <Label>Цена</Label>
            <Input type="number" v-model="productRef.price" />
          </div>

          <!-- <div class="flex flex-col gap-2">
            <Label>Цена со скидкой</Label>
            <Input type="number" v-model="productRef.discounted_price" />
          </div> -->

          <div class="flex flex-col gap-2">
            <Label>Количество</Label>
            <Input type="number" v-model="productRef.product_quantity" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Артикул</Label>
            <Input type="text" v-model="productRef.vendor_code" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Штрихкод</Label>
            <Input type="text" v-model="productRef.barcode" />
          </div>
        </div>

        <hr />

        <div class="grid grid-cols-4 gap-x-2 gap-y-4">
          <div class="flex flex-col gap-2">
            <Label>Вес</Label>
            <Input type="number" v-model="productRef.weight" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Ширина</Label>
            <Input type="number" v-model="productRef.width" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Высота</Label>
            <Input type="number" v-model="productRef.height" />
          </div>

          <div class="flex flex-col gap-2">
            <Label>Длина</Label>
            <Input type="number" v-model="productRef.depth" />
          </div>
        </div>

        <hr />

        <div>
          <h4 class="font-medium">Материалы:</h4>
          <div class="flex flex-col gap-2 mt-4">
            <div
              class="flex items-center leading-none"
              v-for="item in materials"
            >
              <input
                type="checkbox"
                v-model="productRef.materials"
                :value="item.slug"
                @update="set(item.slug)"
                :id="item.slug"
              />
              <label :for="item.slug" class="block pl-2 cursor-pointer">{{
                item.title
              }}</label>
            </div>
          </div>
        </div>

        <hr />

        <div>
          <h4 class="font-medium">Цвет:</h4>
          <div class="flex flex-col gap-2 mt-4">
            <div class="flex items-center leading-none" v-for="item in colors">
              <input
                type="checkbox"
                v-model="productRef.colors"
                :value="item.slug"
                @update="setColors(item.slug)"
                :id="item.slug"
              />
              <label :for="item.slug" class="block pl-2 cursor-pointer"
                >{{ item.title }}
              </label>
              <div
                :style="`background: ${item.code}`"
                class="rounded-full w-4 h-4 ml-2 border-black border"
              ></div>
            </div>
          </div>
        </div>

        <Button @click="storeProduct">Сохранить</Button>
      </div>
      <!-- Photos -->
      <div class="">
        <UploadBtn @change.prevent="uploadMultiImage" />

        <h2 v-if="uploadedImagesPreview.length > 0" class="font-medium mt-4">
          Новые изображения
        </h2>

        <!--  -->
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
        </div>

        <h2 class="font-medium mt-4">Загруженные изображения</h2>

        <div class="flex flex-col gap-8 mt-2">
          <div v-for="media in product?.product_files" class="relative">
            <div class="overflow-hidden rounded-md">
              <img :src="media.file" alt="" class="block w-full" />
            </div>

            <div class="absolute top-2 flex items-center gap-1 right-2">
              <Button
                variant="outline"
                class="p-0 w-8 h-8"
                @click="deleteImage(slug, media.id)"
              >
                <Trash2 width="16" class="text-red-700" />
              </Button>
            </div>

            <div class="absolute top-2 left-2">
              <Badge v-if="media?.is_cover">Обложка</Badge>
            </div>

            <div class="flex items-center mt-2">
              <Button
                v-if="!media?.is_cover"
                class="text-xs"
                variant="outline"
                size="xs"
                @click="makePoster(media?.id)"
              >
                Сделать обложкой
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <pre>
      {{ product }}
    </pre> -->
  </Inner>
</template>

<style lang="scss" scoped></style>
