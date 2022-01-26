import ArticleItem from "@/components/ArticleItem"
import { InfiniteScroll, PullToRefresh } from "antd-mobile"
import styles from "./index.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { getArticleList } from "@/store/actions/home"
import { RootState } from "@/types/store"
import { useHistory } from "react-router-dom"
type Props = {
  channelId: number
}

const ArticleList = ({ channelId }: Props) => {
  const history = useHistory()
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
    await dispatch(getArticleList(channelId, pre_timestamp, "append"))
  }
  const onRefresh = async () => {
    await dispatch(getArticleList(channelId, Date.now() + "", "replace"))
  }

  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      <PullToRefresh onRefresh={onRefresh}>
        {results.map((item, index) => {
          return (
            <div className="article-item" key={index} onClick={() => history.push(`/articles/${item.art_id}`)}>
              <ArticleItem {...item} />
            </div>
          )
        })}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </PullToRefresh>
    </div>
  )
}
export default ArticleList
