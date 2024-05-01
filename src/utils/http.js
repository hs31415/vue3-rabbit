// axios基础的封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 10000
})

httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()
  
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  if(e.response.status === 401){
    userStore.clearUserInfo()
    router.push("/login")
    ElMessage.warning('请重新登录')
  }
  return Promise.reject(e)
})


export default httpInstance