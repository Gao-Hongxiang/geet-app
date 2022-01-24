import { Button, NavBar, Form, Input, Toast } from "antd-mobile"
import type { LoginForm } from "@/types/data"
import { loginAction, getCode } from "@/store/actions/login"
import { useDispatch } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import styles from "./index.module.scss"
import { AxiosError } from "axios"
import { useRef, useState, useEffect } from "react"
import { InputRef } from "antd-mobile/es/components/input"

const Login = () => {
  const location = useLocation<{ from: string } | undefined>()
  // const timerRef = useRef(-1);
  const [timeLeft, setTimeLeft] = useState(0)
  const timerRef = useRef(-1)
  const mobileRef = useRef<InputRef>(null)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const history = useHistory()
  // location.state.from
  const onGetCode = async () => {
    // 拿到手机号
    const mobile = (form.getFieldValue("mobile") ?? "") as string
    // 判断手机号校验是否成功
    const hasError = form.getFieldError("mobile").length > 0
    if (mobile.trim() === "" || hasError) {
      return mobileRef.current?.focus()
    }

    try {
      // 调用action
      await dispatch(getCode(mobile)) // 发送验证码
      Toast.show({
        content: "验证码已发送",
      })
      // 开始计时
      setTimeLeft(60) // 开始计时  倒计时
      // 开启倒计时

      timerRef.current = window.setInterval(() => {
        setTimeLeft((count) => count - 1) // 设置当前计时一次比一次小
      }, 1000) // 将定时器标识赋值ref属性
    } catch (error) {
      // 需要将error的对象 断言成 axios的错误
      const e = error as AxiosError<{ message: string }>
      // 当失败时进行提示
      Toast.show({
        content: e.response?.data.message,
      })
    }
  }
  useEffect(() => {
    if (timeLeft === 0) {
      window.clearInterval(timerRef.current)
    }
  }, [timeLeft])
  useEffect(() => {
    return () => {
      // 组件卸载时清理定时器
      window.clearInterval(timerRef.current)
    }
  }, [])
  const onFinish = async (values: LoginForm) => {
    try {
      await dispatch(loginAction(values))
      Toast.show({
        content: "登录成功",
        duration: 600,
        afterClose: () => {
          if (location.state) {
            history.replace(location.state.from)
            return
          }

          history.replace("/home/index")
        },
      })
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      Toast.show({
        content: error.response?.data.message,
        duration: 1000,
      })
    }
  }

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}></NavBar>

      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form
          form={form}
          validateTrigger={["onBlur"]}
          onFinish={onFinish}
          // initialValues={{
          //   // 注意 mobile 是字符串类型！！！
          //   mobile: "1391111222",
          //   code: "24681",
          // }}
        >
          <Form.Item
            className="login-item"
            name="mobile"
            // validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "请输入手机号",
              },
              {
                message: "手机号格式错误",
                pattern: /^1[3-9]\d{9}$/,
              },
            ]}
          >
            <Input ref={mobileRef} placeholder="请输入手机号" autoComplete="off" maxLength={11} />
          </Form.Item>

          <Form.Item
            name="code"
            className="login-item"
            // validateTrigger="onBlur"
            extra={
              <span className="code-extra" onClick={timeLeft === 0 ? onGetCode : undefined}>
                {timeLeft === 0 ? "发送验证码" : `${timeLeft}s后重新获取`}
              </span>
            }
            rules={[
              { required: true, message: "请输入验证码" },
              {
                pattern: /^\d{6}$/,
                message: "验证码格式错误",
              },
            ]}
          >
            <Input placeholder="请输入验证码" autoComplete="off" maxLength={6} />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          <Form.Item noStyle shouldUpdate>
            {() => {
              // isFieldsTouched(true) 用来判断登录表单中的所有表单项是否被操作过
              //  如果都操作过，结果为：true； 否则，为 false
              //  如果只看该判断项，如果为 true 表示操作过，此时，才可能是不禁用
              //                 如果为 false 表示没有操作过（没有输入过内容），就应该是禁用
              // console.log('登录按钮重新渲染了', form.isFieldsTouched(true))
              // console.log(form.getFieldsError())

              // 获取校验失败的表单项
              // const errors = form.getFieldsError().filter(item => item.errors.length > 0)

              // 如果需要获取 表单校验 是否成功，只需要获取上述 errors 数组的长度
              //  如果长度大于 0 说明有错误，表示：表单校验失败；否则，表单校验成功
              // console.log(
              //   form.getFieldsError().filter(item => item.errors.length > 0)
              // )

              // 得到禁用状态
              const disabled = form.getFieldsError().filter((item) => item.errors.length > 0).length > 0 || !form.isFieldsTouched(true)

              return (
                <Button disabled={disabled} block type="submit" color="primary" className="login-submit">
                  登 录
                </Button>
              )
            }}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
