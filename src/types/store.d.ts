import { User } from "./data"
import store from "@/store"
import { Token } from "./data"
import { ThunkAction } from "redux-thunk"
export type RootState = ReturnType<typeof store.getState>
export type RootAction = LoginAction | ProfileAction
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
//登录action类型
export type LoginAction = {
  type: "login/token"
  payload: Token
}
export type ProfileAction = {
  type: "profile/getUser"
  payload: User
}
