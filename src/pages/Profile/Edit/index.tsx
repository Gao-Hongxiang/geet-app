import { Button, List, DatePicker, NavBar, Popup, Toast, Dialog } from "antd-mobile"
import classNames from "classnames"
import { useHistory } from "react-router"
import styles from "./index.module.scss"
import { useInitialState } from "@/utils/use-initial-state"
import EditInput from "./components/EditInput"
import { useDispatch } from "react-redux"
import { getUpdataUserProfile, getUserProfile } from "@/store/actions/profile"
import { useRef, useState } from "react"
import EditList from "./components/EditList"
import moment from "moment"
import { logout1 } from "@/store/actions/login"
const Item = List.Item
type InputPopup = {
  type: "" | "intro" | "name"
  value?: string
  visible: boolean
}
type ListPopup = {
  type: "" | "gender" | "photo"
  visible: boolean
}
const ProfileEdit = () => {
  const fileRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  // const [inputVisible, setInputVisuble] = useState(false)
  const [inputPopup, setInputPopup] = useState<InputPopup>({
    type: "",
    value: "",
    visible: false,
  })
  const [listPopup, setListPopup] = useState<ListPopup>({
    type: "",
    visible: false,
  })
  const { userprofile: profile } = useInitialState(getUserProfile, "profile")
  const [showBirthday, setShowBirthday] = useState(false)

  const onBirthdayShow = () => {
    setShowBirthday(true)
  }
  const onBirthdayHide = () => {
    setShowBirthday(false)
  }
  const history = useHistory()
  // const onInputHide = () => {
  //   setInputVisuble(false)
  // }
  const onUpdateName = async (type: "name" | "intro" | "gender" | "photo" | "birthday", value: string | number) => {
    if (type === "photo") {
      fileRef.current?.click()
    } else {
      // ... 原来的逻辑
      await dispatch(getUpdataUserProfile({ [type]: value }))
      Toast.show({
        content: "更新成功",
        duration: 1000,
      })
      onListPopupHide()
    }

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
  const onGenderShow = () => {
    setListPopup({
      type: "gender",
      visible: true,
    })
  }
  const onListPopupHide = () => {
    setListPopup({
      type: "",
      visible: false,
    })
  }
  const onPhotoShow = () => {
    setListPopup({
      type: "photo",
      visible: true,
    })
  }
  const onUpdateBirthday = (value: Date) => {
    console.log(value)
    const birthday = moment(value).format("YYYY-MM-DD")
    // const birthday = dayjs(value).format("YYYY-MM-DD")

    onUpdateName("birthday", birthday)
    onBirthdayHide()
  }
  const onChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const photoData = new FormData()
    photoData.append("photo", file)
  }
  const logout = () => {
    const handler = Dialog.show({
      title: "温馨提示",
      content: "亲，您确定要退出吗？",
      actions: [
        [
          {
            key: "cancel",
            text: "取消",
            onClick: () => {
              handler.close()
            },
          },
          {
            key: "confirm",
            text: "退出",
            style: {
              color: "var(--adm-color-weak)",
            },
            onClick: () => {
              dispatch(logout1())
              handler.close()
              history.replace("/login")
            },
          },
        ],
      ],
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
              onClick={onPhotoShow}
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
            <Item onClick={onIntroShow} arrow extra={<span className={classNames("intro", "normal")}>{profile.intro || "未填写"}</span>}>
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={profile.gender === 0 ? "男" : "女"} onClick={onGenderShow}>
              性别
            </Item>
            <Item arrow extra={profile.birthday} onClick={onBirthdayShow}>
              生日
            </Item>
          </List>
          <input type="file" hidden onChange={onChangePhoto} />
          <DatePicker
            visible={showBirthday}
            value={new Date(profile.birthday)}
            onCancel={onBirthdayHide}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
            onConfirm={onUpdateBirthday}
          />
        </div>

        <div className="logout">
          <Button className="btn" onClick={logout}>
            退出登录
          </Button>
        </div>
      </div>
      {/* <Popup visible={inputPopup.visible} position="right" destroyOnClose> */}
      <Popup visible={inputPopup.visible} position="right">
        <EditInput type={inputPopup.type} value={inputPopup.value ?? ""} onInputHide={onInputHide} onUpdateName={onUpdateName}></EditInput>
      </Popup>
      <Popup visible={listPopup.visible} onMaskClick={onListPopupHide} destroyOnClose>
        <EditList
          onClose={onListPopupHide}
          type={listPopup.type}
          // onUpdateProfile 复用修改昵称或简介时的函数
          onUpdateProfile={onUpdateName}
        />
      </Popup>
    </div>
  )
}
export default ProfileEdit
