import { combineReducers } from "redux"
import home from "./home"
import login from "./login"
import { profile } from "./profile"
import article from "./article"
import search from "./search"
const rootReducer = combineReducers({
  login,
  profile,
  home,
  article,
  search,
})
export default rootReducer
