import ArticleItem from "@/components/ArticleItem"
import { InfiniteScroll } from "antd-mobile"
import styles from "./index.module.scss"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getArticleList } from "@/store/actions/home"
import { RootState } from "@/types/store"
type Props = {
  channelId: number
}
const ArticleList = ({ channelId }: Props) => {
  const articles = useSelector((state: RootState) => {
    return state.home.channelArticles
  })
  const { results } = articles[channelId] ?? {
    results: [],
  }
  const dispatch = useDispatch()
  const [hasMore, setHasMore] = useState(true)
  async function loadMore() {
    await dispatch(getArticleList(channelId, Date.now() + ""))
    setHasMore(true)
  }
  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      {results.map((item, index) => {
        return (
          <div className="article-item" key={index}>
            <ArticleItem {...item} />
          </div>
        )
      })}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}
export default ArticleList
