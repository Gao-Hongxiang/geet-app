import { ProfileAction } from "./../../types/store.d"
import { User } from "@/types/data"
type ProfileState = {
  user: User
}
const initialState = {
  user: {},
} as ProfileState
export function profile(
  state = initialState,
  action: ProfileAction
): ProfileState {
  switch (action.type) {
    case "profile/getUser":
      return { ...state, user: action.payload }

    default:
      return { ...state }
  }
}
