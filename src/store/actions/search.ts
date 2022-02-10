import { SuggestionResponse, SuggestionResultResponse } from "@/types/data"
import { RootThunkAction } from "@/types/store"
import { http } from "@/utils/http"

export const getSuggestion = (value: string): RootThunkAction => {
  return async (dispatch) => {
    const res = (await http.get("/suggestion", {
      params: {
        q: value,
      },
    })) as SuggestionResponse
    dispatch({ type: "search/suggestion", payload: res.data.options })
  }
}
export const clearSuggestion = () => ({ type: "search/clearSuggestion" })

export const getSuggestionResult = (query: string): RootThunkAction => {
  return async (dispatch) => {
    const res = (await http.get("/search", {
      params: {
        page: 1,
        per_page: 10,
        q: query,
      },
    })) as SuggestionResultResponse
    dispatch({ type: "search/getSuggestionResult", payload: res.data })
  }
}
