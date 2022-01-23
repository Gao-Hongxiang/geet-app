import { Input, NavBar, TextArea } from "antd-mobile"
import { useEffect, useState } from "react"

import styles from "./index.module.scss"
type Props = {
  type: "" | "name" | "intro"
  onInputHide: () => void
  value: string
  onUpdateName: (type: "name" | "intro", value: string) => void
}
const EditInput = ({ onInputHide, value, onUpdateName, type }: Props) => {
  useEffect(() => {
    // value 为 null 或 undefined 时，设置为默认值为空字符串
    setInputValue(value ?? "")
  }, [value])
  const onInputHide1 = () => {
    setInputValue(value)
    onInputHide()
  }

  const isName = type === "name"
  const [inputValue, setInputValue] = useState(value)
  return (
    <div className={styles.root}>
      <NavBar
        onBack={onInputHide1}
        className="navbar"
        right={
          <span
            className="commit-btn"
            onClick={() => {
              if (type === "") return
              onUpdateName(type, inputValue)
              onInputHide()
            }}
          >
            提交
          </span>
        }
      >
        编辑{isName ? "昵称" : "简介"}
      </NavBar>

      <div className="edit-input-content">
        <h3>{isName ? "昵称" : "简介"}</h3>

        {isName ? (
          <div className="input-wrap">
            <Input
              placeholder="请输入"
              value={inputValue}
              onChange={setInputValue}
            />
          </div>
        ) : (
          <TextArea
            className="textarea"
            placeholder="请输入"
            // 展示：右下角的字数统计
            showCount
            // 指定内容最大长度
            maxLength={100}
            // 指定 文本域 展示内容的行数（文本域高度）
            rows={4}
            value={inputValue}
            onChange={setInputValue}
          />
        )}
      </div>
    </div>
  )
}

export default EditInput
