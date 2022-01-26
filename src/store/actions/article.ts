import { ArticleInfoResponse } from "./../../types/data.d"
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
