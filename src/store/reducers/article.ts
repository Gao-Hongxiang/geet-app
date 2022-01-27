import { ArticleAction } from "./../../types/store.d"
import { ArtComment, ArticleComment, ArticleInfo } from "@/types/data.d"
type ArticleState = {
  detail: ArticleInfo
  comment: ArticleComment
}
const initialState: ArticleState = {
  detail: {},
  comment: {
    results: [] as ArtComment[],
  },
} as ArticleState

export default function article(state = initialState, action: ArticleAction) {
  switch (action.type) {
    case "article/get":
      return { ...state, detail: action.payload }
    case "article/getArticleComments":
      // total_count: number;
      // end_id: string | null;
      // last_id: string | null;
      // results: ArtComment[];
      const { total_count, end_id, last_id, results } = action.payload
      return {
        ...state,
        comment: {
          total_count,
          end_id,
          last_id,
          results: false ? results : [...state.comment.results, ...results],
        },
      }
    default:
      return state
  }
}
