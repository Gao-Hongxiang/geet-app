//注册登陆接口返回的数据类型
export type Token = {
  token: string
  refresh_token: string
}
//登陆表单数据类型
export type LoginForm = {
  mobile: string
  code: string
}

type ApiResponse<T> = {
  message: string
  data: T
}
export type LoginResponse = ApiResponse<Token>
// ├─ id	string	必须		用户id
// ├─ name	string	必须		用户名
// ├─ photo	string	必须		用户头像
// ├─ is_media	string	必须		是否是自媒体，0-否，1-是
// ├─ intro	string	必须		简介
// ├─ certi	string	必须		自媒体认证说明
// ├─ art_count	string	必须		发布文章数
// ├─ follow_count	string	必须		关注的数目
// ├─ fans_count	string	必须		fans_count
// ├─ like_count	string	必须		被点赞数

export type User = {
  id: string
  name: string
  photo: string
  intro: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}
export type UserResponse = ApiResponse<User>
export type UserProfile = {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
  intro?: string
}
export type UserProfileResponse = ApiResponse<UserProfile>

//频道类型

export type Channel = {
  id: number
  name: string
}
//redux存储结构
export type UserChannel = {
  channels: Channel[]
}
//respose响应数据结构

export type UserChannelResponse = ApiResponse<UserChannel>
// ├─ pre_timestamp	integer	必须		请求前一页历史数据的时间戳
// ├─ results	object []	必须
// item 类型: object

// ├─ art_id	string	必须		文章id
// ├─ title	string	必须		文章标题
// ├─ aut_id	string	必须		作者id
// ├─ aut_name	string	必须		作者名称
// ├─ comm_count	string	必须		评论数量
// ├─ pubdate	string	必须		发布时间
// ├─ cover	object	必须		封面
// ├─ type	string	必须		封面类型，0-无封面，1-1张封面图片，3-3张封面
// ├─ images	string	必须		封面图片
export type Articles = {
  pre_timestamp: string
  results: {
    art_id: string
    title: string
    aut_name: string
    aut_id: string
    comm_count: number
    pubdate: string
    cover: {
      type: number
      images: string[]
    }
  }[]
}
export type ArticlesResponse = ApiResponse<Articles>
