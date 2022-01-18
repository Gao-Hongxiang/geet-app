import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootReducer from "./reducers"
import { getToken } from "@/utils/auth"
const initialState = {
  // 注意：此处的 login 属性是根据合并reducer时，login 的名称而来的
  login: getToken(),
}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
