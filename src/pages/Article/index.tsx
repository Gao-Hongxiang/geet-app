import { NavBar, InfiniteScroll, Popup } from "antd-mobile"
import { useHistory } from "react-router-dom"
import classNames from "classnames"
import styles from "./index.module.scss"
import DOMPurify from "dompurify"
import ContentLoader from "react-content-loader"
import Icon from "@/components/Icon"
import CommentItem from "./components/CommentItem"
import CommentFooter from "./components/CommentFooter"
import { useInitialState } from "@/utils/use-initial-state"
import { getArticleInfo, getArticleComment, addArticleComment } from "@/store/actions/article"
import { useParams } from "react-router"
import CommentInput from "./components/CommentInput"

import dayjs from "dayjs"
// 导入本地化格式插件
import localizedFormat from "dayjs/plugin/localizedFormat"

import highlight from "highlight.js"
import "highlight.js/styles/vs2015.css"
import { useEffect, useRef, useState } from "react"
import NoneComment from "./components/NoneComment"
import { useDispatch } from "react-redux"
enum CommentType {
  Article = "a",
  Comment = "c",
}

dayjs.extend(localizedFormat)
const Article = () => {
  const dispatch = useDispatch()
  // 创建控制文章评论弹出层展示或隐藏的状态
  const [showArticleComment, setShowArticleComment] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const params = useParams<{ id: string }>()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const getArticleInfoFn = () => {
    return getArticleInfo(params.id)
  }
  const onAddCommetn = async (value: string) => {
    await dispatch(addArticleComment(art_id, value))
    setShowArticleComment(false)
  }

  const renderArticleComment = () => {
    return (
      <Popup
        destroyOnClose
        bodyStyle={{
          height: "100%",
        }}
        position="bottom"
        visible={showArticleComment}
      >
        <CommentInput onClose={() => setShowArticleComment(false)} onAddComment={onAddCommetn} />
      </Popup>
    )
  }
  // 文章详情 代码内容 高亮
  useEffect(() => {
    const dgHtmlDOM = document.querySelector(".dg-html")
    const codes = dgHtmlDOM?.querySelectorAll<HTMLElement>("pre code")
    // console.log(codes)
    if (codes && codes.length > 0) {
      codes.forEach((el) => {
        // 让每个 code 内容实现代码高亮
        highlight.highlightElement(el)
      })
      return
    }

    highlight.configure({
      // 忽略警告
      ignoreUnescapedHTML: true,
    })

    // 直接找到所有的 pre 标签
    const pres = dgHtmlDOM?.querySelectorAll("pre")
    if (pres && pres.length > 0) {
      pres.forEach((el) => {
        highlight.highlightElement(el)
      })
    }
  }, [])

  // ├─ art_id	string	必须		文章ID
  // ├─ title	string	必须		文章标题
  // ├─ pubdate	string	必须		发布日期
  // ├─ aut_id	string	必须		作者id
  // ├─ aut_name	string	必须		作者名
  // ├─ aut_photo	string	必须		作者头像url 无图片，默认为null
  // ├─ is_followed	boolean	必须		是否关注了作者
  // ├─ attitude	integer	必须		用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
  // ├─ content	string	必须		文章内容
  const { detail } = useInitialState(getArticleInfoFn, "article")
  const { art_id, title, pubdate, content, aut_name, aut_photo, is_followed, is_collected, attitude, comm_count, read_count, like_count } = detail
  const { comment } = useInitialState(() => {
    return getArticleComment(CommentType.Article, params.id, null, "replace")
  }, "article")
  const history = useHistory()
  // useEffect(() => {
  //   dispatch(getArticleComment(CommentType.Article, params.id, null, "replace"))
  // }, [dispatch, params.id])

  const loadMoreComments = async () => {
    console.log("加载更多评论")
  }

  const onScrollTop = () => {
    if (wrapperRef.current) {
      if (showComment) {
        wrapperRef.current.scrollTop = 0
      } else {
        const contentDom = wrapperRef.current.querySelector<HTMLDivElement>(".article-wrapper")
        if (contentDom) {
          wrapperRef.current.scrollTop = contentDom.offsetHeight + 30
        }
      }
    }
    setShowComment(!showComment)
  }

  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper" ref={wrapperRef}>
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
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content),
              }}
            />
            ;<div className="date">发布文章时间：{dayjs(pubdate).locale("zh-cn").format("LL")}</div>
          </div>
        </div>

        <div className="comment">
          <div className="comment-header">
            <span>全部评论（{comm_count}）</span>
            <span>{like_count} 点赞</span>
          </div>
          {comment.results.length > 0 ? (
            <div className="comment-list">
              {comment.results.map((item, index) => {
                return <CommentItem {...item} key={index} />
              })}
              <InfiniteScroll hasMore={false} loadMore={loadMoreComments} />
            </div>
          ) : (
            <NoneComment />
          )}
        </div>
      </div>
    )
  }

  if (!art_id) {
    return (
      // 根据当前页面结构，设计好的 loading 效果
      <ContentLoader speed={2} width={375} height={230} viewBox="0 0 375 230" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
        <rect x="16" y="8" rx="3" ry="3" width="340" height="10" />
        <rect x="16" y="26" rx="0" ry="0" width="70" height="6" />
        <rect x="96" y="26" rx="0" ry="0" width="50" height="6" />
        <rect x="156" y="26" rx="0" ry="0" width="50" height="6" />
        <circle cx="33" cy="69" r="17" />
        <rect x="60" y="65" rx="0" ry="0" width="45" height="6" />
        <rect x="304" y="65" rx="0" ry="0" width="52" height="6" />
        <rect x="16" y="114" rx="0" ry="0" width="340" height="15" />
        <rect x="263" y="208" rx="0" ry="0" width="94" height="19" />
        <rect x="16" y="141" rx="0" ry="0" width="340" height="15" />
        <rect x="16" y="166" rx="0" ry="0" width="340" height="15" />
      </ContentLoader>
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
        {/* 创建文章评论的弹出层 */}
        {renderArticleComment()}
        {/* 底部评论栏 */}
        <CommentFooter onScrollTop={onScrollTop} attitude={attitude} is_collected={is_collected} onShowArticleComment={() => setShowArticleComment(true)} />
      </div>
    </div>
  )
}

export default Article
