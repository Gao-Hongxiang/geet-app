import store from "@/store"
import { Token } from "./data"
import { ThunkAction } from "redux-thunk"
export type RootState = ReturnType<typeof store.getState>
export type RootAction = LoginAction
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
//登录action类型
export type LoginAction = {
  type: "login/token"
  payload: Token
}
