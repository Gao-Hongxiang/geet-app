import { NavBar, InfiniteScroll } from "antd-mobile"
import { useHistory } from "react-router-dom"
import classNames from "classnames"
import styles from "./index.module.scss"

import Icon from "@/components/Icon"
import CommentItem from "./components/CommentItem"
import CommentFooter from "./components/CommentFooter"
import { useInitialState } from "@/utils/use-initial-state"
import { getArticleInfo } from "@/store/actions/article"
import { useParams } from "react-router"
import dayjs from "dayjs"
// 导入本地化格式插件
import localizedFormat from "dayjs/plugin/localizedFormat"
dayjs.extend(localizedFormat)
const Article = () => {
  const params = useParams<{ id: string }>()
  const getArticleInfoFn = () => {
    return getArticleInfo(params.id)
  }

  // ├─ art_id	string	必须		文章ID
  // ├─ title	string	必须		文章标题
  // ├─ pubdate	string	必须		发布日期
  // ├─ aut_id	string	必须		作者id
  // ├─ aut_name	string	必须		作者名
  // ├─ aut_photo	string	必须		作者头像url 无图片，默认为null
  // ├─ is_followed	boolean	必须		是否关注了作者
  // ├─ attitude	integer	必须		用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
  // ├─ content	string	必须		文章内容
  // ├─ is_collected	boolean	必须		是否收藏了文章
  const {
    detail: { art_id, title, pubdate, aut_id, content, aut_name, aut_photo, is_followed, is_collected, attitude, comm_count, read_count, like_count },
  } = useInitialState(getArticleInfoFn, "article")

  const history = useHistory()

  const loadMoreComments = async () => {
    console.log("加载更多评论")
  }

  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper">
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{title}</h1>

            <div className="info">
              <span>{dayjs(pubdate).locale("zh-cn").format("LL")}</span>
              <span>{read_count} 阅读 </span>
              <span>{comm_count} 评论</span>
            </div>

            <div className="author">
              <img src={aut_photo} alt="" />
              <span className="name">{aut_name}</span>
              <span className={classNames("follow", { is_followed } ? "followed" : "")}>{{ is_followed } ? "已关注" : "关注"}</span>
            </div>
          </div>

          <div className="content">
            <div className="content-html dg-html" />
            <div className="date">发布文章时间：{dayjs(pubdate).locale("zh-cn").format("LL")}</div>
          </div>
        </div>

        <div className="comment">
          <div className="comment-header">
            <span>全部评论（10）</span>
            <span>{like_count} 点赞</span>
          </div>

          <div className="comment-list">
            <CommentItem />

            <InfiniteScroll hasMore={false} loadMore={loadMoreComments} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onBack={() => history.go(-1)}
          right={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {true && (
            <div className="nav-author">
              <img src={aut_photo} alt="" />
              <span className="name">{aut_name}</span>
              <span className={classNames("follow", { is_followed } ? "followed" : "")}>{{ is_followed } ? "已关注" : "关注"}</span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter />
      </div>
    </div>
  )
}

export default Article
