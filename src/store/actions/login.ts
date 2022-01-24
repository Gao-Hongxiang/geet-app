import type { LoginForm, LoginResponse } from "@/types/data.d"
import { http } from "@/utils/http"
import { setToken } from "@/utils/auth"
import type { RootThunkAction } from "@/types/store"
import { clearToken } from "@/utils/auth"
export const loginAction = (LoginParam: LoginForm): RootThunkAction => {
  // return (dispatch) => {
  //   http.post<LoginResponse>("aaaaa", LoginParam).then((result) => {
  //     result.data.
  //   })
  // }
  return async (dispatch) => {
    const res = (await http.post("/authorizations", LoginParam)) as LoginResponse
    console.log(res)

    const token = res.data
    setToken(token)
    dispatch({ type: "login/token", payload: token })
  }
}
export const getCode = (mobile: string) => {
  return async () => {
    await http.get(`/sms/codes/${mobile}`)
  }
}
// 退出登陆action

export const logout1 = (): RootThunkAction => {
  return (dispatch) => {
    dispatch({ type: "login/logout" })
    clearToken()
  }
}
