import dayjs from "dayjs"
import classnames from "classnames"

import Icon from "@/components/Icon"

import styles from "./index.module.scss"
import { ArtComment } from "@/types/data"
type Props = Partial<ArtComment> & {
  // normal 普通 - 文章的评论
  // origin 回复评论的原始评论，也就是对哪个评论进行回复
  // reply 回复评论
  type?: "normal" | "reply" | "origin"
}

const CommentItem = ({
  com_id,
  aut_id,
  aut_name,
  aut_photo,
  like_count,
  reply_count,
  pubdate,
  content,
  is_liking,
  is_followed,
  // normal 普通
  // origin 回复评论的原始评论
  // reply 回复评论
  type = "normal",
}: Props) => {
  // 回复按钮
  const replyJSX =
    type === "normal" ? (
      <span className="replay">
        {reply_count} 回复
        <Icon type="iconbtn_right" />
      </span>
    ) : null

  return (
    <div className={styles.root}>
      <div className="avatar">
        <img src={aut_photo} alt="" />
      </div>
      <div className="comment-info">
        <div className="comment-info-header">
          <span className="name">{aut_name}</span>
          {/* 文章评论、评论的回复 */}
          {(type === "normal" || type === "reply") && (
            <span className="thumbs-up">
              {like_count}
              <Icon type={is_liking ? "iconbtn_like_sel" : "iconbtn_like2"} />
            </span>
          )}
          {/* 要回复的评论 */}
          {type === "origin" && <span className={classnames("follow", { is_followed } ? "followed" : "")}>{{ is_followed } ? "已关注" : "关注"}</span>}
        </div>
        <div className="comment-content">{content}</div>
        <div className="comment-footer">
          {replyJSX}
          {/* 非评论的回复 */}
          {type !== "reply" && <span className="comment-time">{dayjs().from(pubdate)}</span>}
          {/* 文章的评论 */}
          {type === "origin" && (
            <span className="thumbs-up">
              {like_count}
              <Icon type={is_liking ? "iconbtn_like_sel" : "iconbtn_like2"} />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
