import { getToken } from "@/utils/auth"
import { Token } from "@/types/data.d"
import { LoginAction } from "@/types/store"
const inititalState: Token = getToken()

export default function login(state = inititalState, action: LoginAction) {
  switch (action.type) {
    case "login/token":
      return action.payload
    case "login/logout":
      return inititalState
    default:
      return state
  }
}
