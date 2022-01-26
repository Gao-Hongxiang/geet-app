import classnames from "classnames"

import Icon from "@/components/Icon"

import styles from "./index.module.scss"
import dayjs from "dayjs"
// 相对时间插件
import relativeTime from "dayjs/plugin/relativeTime"
// 国际化 - 中文
import "dayjs/locale/zh-cn"
// 启用相对时间
dayjs.extend(relativeTime)
// 启用中文
dayjs.locale("zh-cn")
type Props = {
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
}
// art_id: "8097"
// aut_id: "1111"
// aut_name: "黑马先锋"
// comm_count: 0
// cover:
// type: 0
// [[Prototype]]: Object
// is_top: 0
// pubdate: "2019-03-11 09:00:00"
// title: "学习资源集（持续更新）"
const ArticleItem = ({ art_id, title, aut_name, aut_id, comm_count, pubdate, cover: { type, images } }: Props) => {
  return (
    <div className={styles.root}>
      <div className={classnames("article-content", type === 3 && "t3", type === 0 && "none-mt")}>
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, index) => {
              return (
                <div className="article-img-wrapper" key={index}>
                  <img src={item} alt="" />
                </div>
              )
            })}
          </div>
        )}
      </div>
      <div className={classnames("article-info", type === 0 && "none-mt")}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>{dayjs().from(dayjs(pubdate))}</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
