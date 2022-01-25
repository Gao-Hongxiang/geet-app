import { Articles, Channel } from "./../../types/data.d"
import { HomeAction } from "@/types/store"
type HomeState = {
  useChannels: Channel[]
  channelArticles: {
    [key in number]: Articles
  }
}

const initialState: HomeState = {
  useChannels: [],
  channelArticles: {},
}
export default function Home(state = initialState, action: HomeAction) {
  switch (action.type) {
    case "home/getUserChannels":
      return { ...state, useChannels: action.payload }
    case "home/getChannelArticles":
      const {
        data: { pre_timestamp, results },
        channelId,
      } = action.payload
      const preArticles = state.channelArticles[channelId] ? state.channelArticles[channelId].results : []
      return {
        ...state,
        channelArticles: { ...state.channelArticles, [channelId]: { pre_timestamp, results: [...preArticles, ...results] } },
      }
    default:
      return state
  }
}
