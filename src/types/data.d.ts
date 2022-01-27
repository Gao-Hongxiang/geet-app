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
// ├─ art_id	string	必须		文章ID
// ├─ title	string	必须		文章标题
// ├─ pubdate	string	必须		发布日期
// ├─ aut_id	string	必须		作者id
// ├─ aut_name	string	必须		作者名
// ├─ aut_photo	string	必须		作者头像url 无图片，默认为null
// ├─ is_followed	boolean	必须		是否关注了作者
// ├─ attitude	integer	必须		用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
// ├─ content	string	必须		文章内容
// ├─ is_collected	boolean	必须		是否收藏了文章
export type ArticleInfo = {
  art_id: string
  title: string
  pubdate: string
  aut_id: string
  aut_name: string
  aut_photo: string
  is_followed: boolean
  attitude: number
  content: string
  is_collected: boolean
  comm_count: number
  read_count: numbner
  like_count: number
}

export type ArticleInfoResponse = ApiResponse<ArticleInfo>

// data	object	必须
// ├─ total_count	integer	必须		该文章的评论总数 或 该评论的回复总数
// ├─ end_id	string	必须		所有评论或回复的最后一个id（截止offset值，小于此值的offset可以不用发送请求获取评论数据，已经没有数据），若无评论或回复数据，则值为NULL
// ├─ last_id	string	必须		本次返回结果的最后一个评论id，作为请求下一页数据的offset参数，若本次无具体数据，则值为NULL
// ├─ results	object []	必须		评论或回复的内容
// item 类型: object

// ├─ com_id	string	必须		评论或回复id
// ├─ aut_id	string	必须		评论或回复的用户id
// ├─ aut_name	string	必须		用户名称
// ├─ aut_photo	string	必须		用户头像url
// ├─ like_count	integer	必须		点赞数量
// ├─ reply_count	integer	必须		回复数量
// ├─ pubdate	string	必须		创建时间
// ├─ content	string	必须		评论或回复内容
// ├─ is_liking	boolean	必须		当前用户是否点赞

// 评论项的类型
export type ArtComment = {
  com_id: string
  aut_id: string
  aut_name: string
  aut_photo: string
  like_count: number
  reply_count: number
  pubdate: string
  content: string
  is_liking: boolean
  is_followed: boolean
}
// 文章评论的类型
export type ArticleComment = {
  total_count: number
  end_id: string | null
  last_id: string | null
  results: ArtComment[]
}
export type ArticleCommentResponse = ApiResponse<ArticleComment>
