<script setup>

import {getCategoryFilterAPI, getSubCategoryAPI} from '@/apis/category'
import {ref, onMounted} from 'vue'
import { useRoute } from 'vue-router'
import GoodsItem from '../Home/components/GoodsItem.vue';

const route = useRoute()
const filterData = ref({})
const getFilterData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  filterData.value = res.result
}

const goodList = ref ([])
const reqData = ref({
  categoryId: route.params.id,
  page:1,
  pageSize:20,
  sortField:'publishTime',
})
const getGoodsList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = res.result.items
}

const tabChange = () => {
  console.log("tab changed")
  reqData.value.page = 1
  getGoodsList()
}


const disabled = ref(false)
const load = async ()=>{
  console.log("获取更多数据")
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = [...goodList.value, ...res.result.items]
  if(res.result.items.length === 0){
    disabled.value = true
  }
}

onMounted(()=>{
  getFilterData()
  getGoodsList()
})


</script>

<template>
  <div class="bread-container">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}` }">{{ filterData.parentName }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body">
        <GoodsItem v-infinite-scroll="load" :infinite-scroll-disabled="disabled" v-for="goods in goodList" :key="goods.id" :goods="goods"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bread-container{
  padding:25px 0;
  color:#666;
}

.sub-container{
  padding:20px 10px;
  background-color:#fff;

  .body{
    display:flex;
    flex-wrap:wrap;
    padding:0 10px;
  }

  .goods-item{
    display:block;
    width:220px;
    margin-right:20px;
    padding:20px 30px;
    text-align:center;

    img{
      width:160px;
      height:160px;
    }

    p{
      padding-top:10px;
    }

    .name{
      font-size:16px;
    }

    .desc{
      color:#999;
      height:29px;
    }

    .price{
      color:&priceColor;
      font-size:20px;
    }
  }

  .pagination{
    margin-top:20px;
    display: flex;
    justify-content:center;
  }
}
</style>