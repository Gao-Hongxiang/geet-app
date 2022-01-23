import { ProfileAction } from "./../../types/store.d"
import { User, UserProfile } from "@/types/data"
type ProfileState = {
  user: User
  userprofile: UserProfile
}
const initialState = {
  user: {},
  userprofile: {},
} as ProfileState
export function profile(
  state = initialState,
  action: ProfileAction
): ProfileState {
  switch (action.type) {
    case "profile/getUser":
      return { ...state, user: action.payload }
    case "profile/getUserProfile":
      return { ...state, userprofile: action.payload }
    case "prifile/update":
      return {
        ...state,
        userprofile: { ...state.userprofile, ...action.payloay },
      }
    default:
      return { ...state }
  }
}
