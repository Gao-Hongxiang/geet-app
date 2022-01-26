import { ArticleInfo, Articles, Channel } from "./data.d"
import { User, Token, UserProfile } from "./data"
import store from "@/store"
import { ThunkAction } from "redux-thunk"
export type RootState = ReturnType<typeof store.getState>
export type RootAction = LoginAction | ProfileAction | HomeAction | ArticleAction
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

export type ArticleAction = {
  type: "article/get"
  payload: ArticleInfo
}
