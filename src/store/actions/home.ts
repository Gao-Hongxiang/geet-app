import { ArticlesResponse } from "./../../types/data.d"
import { Channel } from "../../types/data"
import { http } from "@/utils/http"
import { RootThunkAction } from "@/types/store"
import { UserChannelResponse } from "@/types/data"
const Channel_Key = "geek-channeks"
export const getUserChannel = (): RootThunkAction => {
  return async (dispatch, getState) => {
    let useChannels: Channel[] = []
    const {
      login: { token },
    } = getState()

    if (!!token) {
      const {
        data: { channels },
      } = (await http.get("/user/channels")) as UserChannelResponse
      useChannels = channels
    } else {
      const localChannels = JSON.parse(localStorage.getItem(Channel_Key) ?? "[]") as Channel[]
      if (localChannels.length > 0) {
        useChannels = localChannels
      } else {
        const {
          data: { channels },
        } = (await http.get("/user/channels")) as UserChannelResponse
        localStorage.setItem(Channel_Key, JSON.stringify(channels))
        useChannels = channels
      }
    }
    dispatch({ type: "home/getUserChannels", payload: useChannels })
  }
}
export const getArticleList = (channel_id: number, timestamp: string, type: "append" | "replace"): RootThunkAction => {
  return async (dispatch) => {
    const res = (await http.get("/articles", {
      params: {
        channel_id,
        timestamp,
      },
    })) as ArticlesResponse
    dispatch({ type: "home/getChannelArticles", payload: { data: res.data, channelId: channel_id, actionType: type } })
  }
}
