import { Button, List, DatePicker, NavBar, Popup, Toast } from "antd-mobile"
import classNames from "classnames"
import { useHistory } from "react-router"
import styles from "./index.module.scss"
import { useInitialState } from "@/utils/use-initial-state"
import EditInput from "./components/EditInput"
import { useDispatch } from "react-redux"
import { getUpdataUserProfile, getUserProfile } from "@/store/actions/profile"
import { useState } from "react"
const Item = List.Item
type InputPopup = {
  type: "" | "intro" | "name"
  value?: string
  visible: boolean
}
const ProfileEdit = () => {
  const dispatch = useDispatch()
  // const [inputVisible, setInputVisuble] = useState(false)
  const [inputPopup, setInputPopup] = useState<InputPopup>({
    type: "",
    value: "",
    visible: false,
  })
  const { userprofile: profile } = useInitialState(getUserProfile, "profile")
  const history = useHistory()
  // const onInputHide = () => {
  //   setInputVisuble(false)
  // }
  const onUpdateName = async (type: "name" | "intro", value: string) => {
    await dispatch(getUpdataUserProfile({ [type]: value }))
    Toast.show({
      content: "更新成功",
      duration: 1000,
    })
    // await dispatch(getUserProfile())
  }
  const onInputShow = () => {
    setInputPopup({
      type: "name",
      value: profile.name,
      visible: true,
    })
  }
  const onInputHide = () => {
    setInputPopup({
      type: "",
      value: "",
      visible: false,
    })
  }
  const onIntroShow = () => {
    setInputPopup({
      type: "intro",
      value: profile.intro,
      visible: true,
    })
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          onBack={() => {
            history.goBack()
          }}
          style={{
            "--border-bottom": "1px solid #F0F0F0",
          }}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img width={24} height={24} src={profile.photo} alt="" />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item arrow extra={profile.name} onClick={onInputShow}>
              昵称
            </Item>
            <Item
              onClick={onIntroShow}
              arrow
              extra={
                <span className={classNames("intro", "normal")}>
                  {profile.intro || "未填写"}
                </span>
              }
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={profile.gender === 0 ? "男" : "女"}>
              性别
            </Item>
            <Item arrow extra={profile.birthday}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={false}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className="logout">
          <Button className="btn">退出登录</Button>
        </div>
      </div>
      {/* <Popup visible={inputPopup.visible} position="right" destroyOnClose> */}
      <Popup visible={inputPopup.visible} position="right">
        <EditInput
          type={inputPopup.type}
          value={inputPopup.value ?? ""}
          onInputHide={onInputHide}
          onUpdateName={onUpdateName}
        ></EditInput>
      </Popup>
    </div>
  )
}
export default ProfileEdit
