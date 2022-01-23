import { UserProfile, UserProfileResponse, UserResponse } from "@/types/data"
import { RootThunkAction } from "@/types/store"
import { http } from "@/utils/http"

export const getUser = (): RootThunkAction => {
  return async (dispatch) => {
    const res = (await http.get("/user")) as UserResponse
    dispatch({ type: "profile/getUser", payload: res.data })
  }
}
export const getUserProfile = (): RootThunkAction => {
  return async (dispatch) => {
    const res = (await http.get("/user/profile")) as UserProfileResponse
    dispatch({ type: "profile/getUserProfile", payload: res.data })
  }
}
type CustomUser = Partial<UserProfile>
export const getUpdataUserProfile = (
  userProfile: CustomUser
): RootThunkAction => {
  return async (dispatch) => {
    await http.patch("/user/profile", userProfile)
    dispatch({ type: "prifile/update", payloay: userProfile })
  }
}
