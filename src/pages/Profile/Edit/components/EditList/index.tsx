import styles from "./index.module.scss"
type Props = {
  onClose: () => void
  type: "" | "gender" | "photo"
  onUpdateProfile: (type: "gender" | "photo", value: string | number) => void
}
const genderList = [
  { text: "男", value: "0" },
  { text: "女", value: "1" },
]

const photoList = [
  { text: "拍照", value: "picture" },
  { text: "本地选择", value: "local" },
]
const EditList = ({ onClose, type, onUpdateProfile }: Props) => {
  const list = type === "gender" ? genderList : photoList
  return (
    <div className={styles.root}>
      {list.map((item) => (
        <div
          className="list-item"
          key={item.text}
          onClick={() => {
            if (type === "") return
            onUpdateProfile(type, item.value)
          }}
        >
          {item.text}
        </div>
      ))}

      <div className="list-item" onClick={onClose}>
        取消
      </div>
    </div>
  )
}

export default EditList
