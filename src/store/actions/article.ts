import { ArticleCommentResponse, ArticleInfoResponse } from "./../../types/data.d"
import { http } from "@/utils/http"
import { RootThunkAction } from "@/types/store"

export const getArticleInfo = (article_id: string): RootThunkAction => {
  return async (dispatch) => {
    const { data } = (await http.get(`/articles/${article_id}`)) as ArticleInfoResponse
    dispatch({
      type: "article/get",
      payload: data,
    })
  }
}
export const getArticleComment = (type: string, source: string, offset: string | null, actionType: "append" | "replace"): RootThunkAction => {
  return async (dispatch) => {
    const { data } = (await http.get("comments", {
      params: {
        type,
        source,
        offset,
      },
    })) as ArticleCommentResponse
    dispatch({
      type: "article/getArticleComments",
      payload: { ...data, actionType },
    })
  }
}
