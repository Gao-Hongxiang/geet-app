import { setToken, clearToken } from "@/utils/auth"
import store from "@/store"
import axios from "axios"
import { Toast } from "antd-mobile"
import { customHistory } from "./history"
import { AxiosError } from "axios"
//基本语法
const http = axios.create({
  timeout: 5000,
  baseURL: "http://toutiao.itheima.net/v1_0",
})
http.interceptors.request.use(
  (config) => {
    // 获取token
    // 注意：极客园h5项目中，login 存储的是一个对象，对象中的 token 属性，才是登录身份令牌
    const {
      login: { token },
    } = store.getState()

    // 除了登录请求外，其他请求统一添加 token
    if (!config.url?.startsWith("/authorizations")) {
      // 此处，需要使用 非空断言 来去掉 headers 类型中的 undefined 类型
      config.headers!.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (response) => {
    return response.data ? response.data : {}
  },
  async (error: AxiosError) => {
    // 响应失败时，会执行此处的回调函数
    if (!error.response) {
      // 网路超时
      Toast.show({
        content: "网络繁忙，请稍后再试",
        duration: 1000,
      })
      return Promise.reject(error)
    }

    if (error.response.status === 401) {
      try {
        // token 过期，登录超时
        let {
          login: { refresh_token },
        } = store.getState()
        if (!refresh_token) {
          await Promise.reject(error)
        }
        const {
          data: {
            data: { token },
          },
        } = await axios({
          url: "http://toutiao.itheima.net/v1_0/authorizations",
          method: "put",
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        })
        const tokenobj = {
          token,
          refresh_token,
        }
        setToken(tokenobj)
        store.dispatch({ type: "login/token", payload: tokenobj })

        return http(error.config) //重新发起之前错误的请求
      } catch (error) {
        clearToken()
        store.dispatch({ type: "login/logout" })
        Toast.show({
          content: "登录超时，请重新登录",
          duration: 1000,
          afterClose: () => {
            customHistory.push("/login", {
              from: customHistory.location.pathname,
            })
          },
        })
      }
    }

    return Promise.reject(error)
  }
)
export { http }
