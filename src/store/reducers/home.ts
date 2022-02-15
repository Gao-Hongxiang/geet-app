import { Articles, Channel } from "./../../types/data.d"
import { HomeAction } from "@/types/store"
import { sortBy } from "lodash"
type HomeState = {
  useChannels: Channel[]
  channelActiveKey: string
  channelArticles: {
    [key in number]: Articles
  }
  restChannel: Channel[]
}

const initialState: HomeState = {
  useChannels: [],
  channelArticles: {},
  restChannel: [],
  channelActiveKey: "",
}
export default function Home(state = initialState, action: HomeAction) {
  switch (action.type) {
    case "home/getUserChannels":
      return { ...state, useChannels: action.payload, channelActiveKey: action.payload[0]?.id + "" }
    case "home/getAllChannel":
      return {
        ...state,
        restChannel: action.payload,
      }
    case "home/changeTab":
      return {
        ...state,
        channelActiveKey: action.payload,
      }
    case "home/getChannelArticles":
      const {
        data: { pre_timestamp, results },
        channelId,
        actionType,
      } = action.payload
      const preArticles = state.channelArticles[channelId] ? state.channelArticles[channelId].results : []
      return {
        ...state,
        channelArticles: { ...state.channelArticles, [channelId]: { pre_timestamp, results: actionType === "append" ? [...preArticles, ...results] : [...results] } },
      }
    case "home/delChannel":
      return {
        ...state,
        // 删除当前频道
        useChannels: state.useChannels.filter((item) => item.id !== action.payload.id),
        // 将被删除频道添加到推荐频道中，并且根据 id 进行排序
        restChannel: sortBy([...state.restChannel, action.payload], "id"),
      }
    case "home/addChannel":
      return {
        ...state,
        useChannels: [...state.useChannels, action.payload],
        restChannel: state.restChannel.filter((item) => item.id !== action.payload.id),
      }
    default:
      return state
  }
}
