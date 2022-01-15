import store from "@/store"
import { ThunkAction } from "redux-thunk"
export type RootState = ReturnType<typeof store.getState>
export type RootAction = any
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
