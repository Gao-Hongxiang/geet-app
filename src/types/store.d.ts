import { ArticleComment } from "@/types/data.d"
import { ArticleInfo, Articles, Channel } from "./data.d"
import { User, Token, UserProfile, Suggestion, SuggestionResult } from "./data"
import store from "@/store"
import { ThunkAction } from "redux-thunk"
export type RootState = ReturnType<typeof store.getState>
export type RootAction = LoginAction | ProfileAction | HomeAction | ArticleAction | SearchAction
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
//登录action类型
export type LoginAction =
  | {
      type: "login/token"
      payload: Token
    }
  | {
      type: "login/logout"
    }
export type ProfileAction =
  | {
      type: "profile/getUser"
      payload: User
    }
  | {
      type: "profile/getUserProfile"
      payload: UserProfile
    }
  | {
      type: "prifile/update"
      payloay: Partial<UserProfile>
    }

export type HomeAction =
  | {
      type: "home/getUserChannels"
      payload: Channel[]
    }
  | {
      type: "home/getChannelArticles"
      payload: {
        data: Articles
        channelId: number
        actionType: "append" | "replace"
      }
    }
  | {
      type: "home/getAllChannel"
      payload: Channel[]
    }
  | {
      type: "home/changeTab"
      payload: string
    }
  | {
      type: "home/delChannel"
      payload: Channel
    }
export type ArticleAction =
  | {
      type: "article/get"
      payload: ArticleInfo
    }
  | {
      type: "article/getArticleComments"
      payload: ArticleComment & { actionType: "append" | "replace" }
    }
  | {
      type: "article/addArticleComment"
      payload: ArtComment
    }
export type ResetAction = {
  type: "reset"
  payload: keyof RootState
}
export type SearchAction =
  | {
      type: "search/suggestion"
      payload: Suggestion["options"]
    }
  | {
      type: "search/clearSuggestion"
    }
  | {
      type: "search/getSuggestionResult"
      payload: SuggestionResult
    }
