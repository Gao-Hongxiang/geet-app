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
