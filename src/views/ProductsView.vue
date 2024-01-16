<script setup>
import Swal from 'sweetalert2'
import axios from 'axios';
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
const { VITE_URL, VITE_PATH } = import.meta.env;
const router = useRouter();
const products = ref([])
const temp = ref(null);
function check() {
    // 取出 token
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("myToken="))
        ?.split("=")[1];
    // 如果有取得 token ，放入 header
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    }
    // 發出 check 請求，如果通過則取得產品
    axios.post(`${VITE_URL}/v2/api/user/check`)
        .then(() => {
            getProducts();
        }).catch(() => {
            Swal.fire({
                title: "請先登入",
                icon: "error",
                didClose: () => {
                    router.push("/login")
                }
            })
        })
}
function getProducts() {
    axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`)
        .then(res => {
            products.value = res.data.products;
        })
}
onMounted(() => {
    check();
})
</script>
<template>
    <div class="container mx-a my-4">
        <div class="grid grid-cols-1 md:grid-cols-2">
            <div>
                <h2 class="font-size-8.5 mb-6">產品列表</h2>
                <table class="mb-4 ">
                    <thead class="border-b-2 border-black border-solid">
                        <tr class="text-left font-bold">
                            <th width="150">產品名稱</th>
                            <th width="120">
                                原價
                            </th>
                            <th width="120">
                                售價
                            </th>
                            <th width="150">
                                是否啟用
                            </th>
                            <th width="120">
                                查看細節
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="products.length">
                            <tr class="border-b border-#DEE2E6 border-solid" v-for="product in products" :key="product.id">
                                <td width="150">{{ product.title }}</td>
                                <td width="120">
                                    {{ product.origin_price }}
                                </td>
                                <td width="120">
                                    {{ product.price }}
                                </td>
                                <td width="150">
                                    <span class="text-green" v-if="product.is_enabled">啟用</span>
                                    <span v-else>未啟用</span>
                                </td>
                                <td width="120">
                                    <button type="button"
                                        class="block w-100% text-white bg-#0d6efd  hover:bg-#0b5ed7 border-0 rd px-4 py-2 fw-bold hover:cursor-pointer"
                                        @click="temp = product">查看細節</button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <p>目前有 <span>{{ products.length }}</span> 項產品</p>
            </div>
            <div>
                <h2 class="font-size-8.5 mb-2">單一產品細節</h2>
                <template v-if="temp">
                    <div class="mb-3 border border-#DEE2E6 border-solid ">
                        <img :src="temp.imageUrl" class="block mx-a mb-4 h-300px" alt="主圖">
                        <div class="mb-4 px-4">
                            <h5 class="font-size-5 mb-2 flex items-center">
                                {{ temp.title }}
                                <span
                                    class=" inline-block bg-#0d6efd font-size-3 py-0.35rem px-0.65rem text-white rd ms-2">{{
                                        temp.category
                                    }}</span>
                            </h5>
                            <p class="mb-4">商品描述：{{ temp.description }}</p>
                            <p class="mb-4">商品內容：{{ temp.content }}</p>
                            <div class="flex">
                                <p class="me-2">{{ temp.price }}</p>
                                <p class=" text-#6C757D"><del>{{ temp.origin_price }}</del></p>
                                元 / {{ temp.unit }}
                            </div>
                        </div>
                    </div>
                    <template v-if="temp.imagesUrl">
                        <img :src="img" alt="" class="h-150px m-2" v-for="img in temp.imagesUrl" :key="img">
                    </template>
                </template>
                <p class="text-#6C757D" v-else>請選擇一個商品查看</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
th,
td {
    padding-top: 8px;
    padding-bottom: 8px;
}
</style>