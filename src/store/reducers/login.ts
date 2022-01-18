import { Token } from "@/types/data.d"
import { LoginAction } from "@/types/store"
const inititalState: Token = {
  token: "",
  refresh_token: "",
}

export default function login(state = inititalState, action: LoginAction) {
  switch (action.type) {
    case "login/token":
      return action.payload

    default:
      return state
  }
}
