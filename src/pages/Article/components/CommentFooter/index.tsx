import Icon from "@/components/Icon"
import styles from "./index.module.scss"
// import { useEffect } from "react"
type Props = {
  attitude: number
  onShowArticleComment: () => void
  is_collected: boolean
  comm_count: number
  // normal 普通评论
  // reply 回复评论
  type?: "normal" | "reply"
  onScrollTop: () => void
}

const CommentFooter = ({ type = "normal", attitude, is_collected, onShowArticleComment, onScrollTop, comm_count }: Props) => {
  return (
    <div className={styles.root}>
      <div className="input-btn" onClick={onShowArticleComment}>
        <Icon type="iconbianji" />
        <span>抢沙发</span>
      </div>

      {type === "normal" && (
        <>
          <div className="action-item" onClick={onScrollTop}>
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {!!comm_count && <span className="bage">{comm_count}</span>}
          </div>
          <div className="action-item">
            <Icon type={!!attitude ? "iconbtn_like_sel" : "iconbtn_like2"} />
            <p>点赞</p>
          </div>
          <div className="action-item">
            <Icon type={is_collected ? "iconbtn_collect_sel" : "iconbtn_collect"} />
            <p>收藏</p>
          </div>
        </>
      )}

      {type === "reply" && (
        <div className="action-item">
          <Icon type={attitude ? "iconbtn_like_sel" : "iconbtn_like2"} />
          <p>点赞</p>
        </div>
      )}

      <div className="action-item">
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter
