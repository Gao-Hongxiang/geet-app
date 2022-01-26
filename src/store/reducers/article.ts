import { ArticleAction } from "./../../types/store.d"
import { ArticleInfo } from "@/types/data.d"
type ArticleState = {
  detail: ArticleInfo
}
const initialState: ArticleState = {
  detail: {},
  // commetn:
} as ArticleState

export default function article(state = initialState, action: ArticleAction) {
  switch (action.type) {
    case "article/get":
      return { ...state, detail: action.payload }

    default:
      return state
  }
}
