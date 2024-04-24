import {ref,onMounted} from 'vue'
import { getCategoryAPI } from '@/apis/category'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

export function useCategory () {
  const categoryList = ref({})
  const route = useRoute()

  const getCategory = async (id = route.params.is) => {
    const res = await getCategoryAPI(id)
    categoryList.value = res.result
  }

  onMounted(() => {
    getCategory()
  })

  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })

  return {
    categoryList
  }
}