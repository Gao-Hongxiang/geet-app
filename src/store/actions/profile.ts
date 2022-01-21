import { UserResponse } from "@/types/data"
import { RootThunkAction } from "@/types/store"
import { http } from "@/utils/http"

export const getUser = (): RootThunkAction => {
  return async (dispatch) => {
    const res = (await http.get("/user")) as UserResponse
    dispatch({ type: "profile/getUser", payload: res.data })
  }
}
