import { useHistory, useLocation } from "react-router-dom"
import { NavBar } from "antd-mobile"
// import { useEffect } from "react"
import ArticleItem from "@/components/ArticleItem"
// import { useDispatch } from "react-redux"
import styles from "./index.module.scss"
import { getSuggestionResult } from "@/store/actions/search"
import { useInitialState } from "@/utils/use-initial-state"

const Result = () => {
  const location = useLocation()
  console.log("location", location)
  // 用来获取查询参数
  const params = new URLSearchParams(location.search)
  console.log("params", params)
  // 注意：获取 查询参数 时，有可能拿不到，此时，设置默认值为 空字符串
  const query = params.get("q") ?? ""
  console.log("query", query)
  // const dispatch = useDispatch()
  const history = useHistory()
  // useEffect(() => {
  //   dispatch(getSuggestionResult(query))
  // }, [dispatch, query])
  const { suggestionResult } = useInitialState(() => getSuggestionResult(query), "search")

  const { results } = suggestionResult

  // console.log('组件重新渲染了：', query)
  const renderArticleList = () => {
    return results.map((item, index) => {
      const {
        title,
        pubdate,
        comm_count,
        aut_name,
        art_id,
        cover: { type, images },
      } = item

      const articleData = {
        title,
        pubdate,
        comm_count,
        aut_name,
        type,
        images,
      }

      return (
        <div key={index} className="article-item" onClick={() => history.push(`/article/${art_id}`)}>
          <ArticleItem {...articleData} />
        </div>
      )
    })
  }
  // 如果需要实现分页效果，可以通过以下方式来判断是否有更多数据
  // const hasMore = page * per_page < total_count
  // 然后，loadMore 时，每次，都让 page + 1 来获取下一页数据

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      <div className="article-list">{renderArticleList()}</div>
    </div>
  )
}

export default Result
