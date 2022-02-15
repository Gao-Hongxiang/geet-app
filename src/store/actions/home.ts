import { ArticlesResponse, AllChannelsResponse } from "./../../types/data.d"
import { Channel } from "../../types/data"
import { http } from "@/utils/http"
import { RootThunkAction } from "@/types/store"
import { UserChannelResponse } from "@/types/data"
import { differenceBy } from "lodash"
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
export const getAllChannel = (): RootThunkAction => {
  return async (dispatch, getState) => {
    const res = (await http.get("channels")) as AllChannelsResponse
    const {
      home: { useChannels },
    } = getState()
    const restChannels = differenceBy(res.data.channels, useChannels, "id")

    dispatch({ type: "home/getAllChannel", payload: restChannels })
  }
}
export const delChannel = (channel: Channel): RootThunkAction => {
  return async (dispatch, getState) => {
    const {
      login: { token },
    } = getState()

    if (token) {
      // 已登录
      await http.delete(`/user/channels/${channel.id}`)
    } else {
      // 未登录
      const localChannels = JSON.parse(localStorage.getItem(Channel_Key) ?? "[]") as Channel[]

      const userChannel = localChannels.filter((item) => item.id !== channel.id)
      localStorage.setItem(Channel_Key, JSON.stringify(userChannel))
    }
    dispatch({ type: "home/delChannel", payload: channel })
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
export const changechannelActiveKey = (id: string) => ({ type: "home/changeTab", payload: id })
