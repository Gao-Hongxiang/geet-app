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

export type LoginResponse = {
  message: string
  data: Token
}
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
export type UserResponse = {
  message: string
  data: User
}
