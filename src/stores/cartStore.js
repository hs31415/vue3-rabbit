// 封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'


export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const addCart = (goods) => {
    console.log('添加', goods)
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if (item) {
      item.count += goods.count
    } else {
      cartList.value.push(goods)
    }
  }
  const delCart = async(skuId) => {
    const idx=cartList.value.findIndex((item) => item.skuId === skuId)
    cartList.value.splice(idx, 1)
  }
  const allCount = computed(() => cartList.value.reduce((prev, item) => prev + item.count, 0))
  const allPrice = computed(() => cartList.value.reduce((prev, item) => prev + item.count * item.price, 0))
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }
  const allCheck = (selected) => {
    cartList.value.forEach((item) => item.selected = selected)
  }
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))


  return {
    cartList,
    delCart,
    addCart,
    allCount,
    allPrice,
    singleCheck,
    allCheck,
    selectedCount,
    selectedPrice,
  }
}, {
  persist: true,
})