import { Articles, Channel } from "./../../types/data.d"
import { HomeAction } from "@/types/store"
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
    default:
      return state
  }
}
