import ArticleItem from "@/components/ArticleItem"
import { InfiniteScroll } from "antd-mobile"
import styles from "./index.module.scss"
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

  const { results, pre_timestamp } = articles[channelId] ?? {
    results: [],
    pre_timestamp: Date.now() + "",
  }

  const dispatch = useDispatch()

  const hasMore = !!pre_timestamp

  async function loadMore() {
    await dispatch(getArticleList(channelId, pre_timestamp))
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
