import classNames from "classnames"
import { useHistory } from "react-router"
import { clearSuggestion } from "@/store/actions/search"
// import { useDebounceFn } from "ahooks"
import debounce from "lodash/debounce"
import { NavBar, SearchBar } from "antd-mobile"
import { getSuggestion } from "@/store/actions/search"
import Icon from "@/components/Icon"
import styles from "./index.module.scss"
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DebouncedFunc } from "lodash"
import { RootState } from "@/types/store"
const GEEK_SEARCH_KEY = "geek-search-history"
const SearchPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { suggestion } = useSelector((state: RootState) => state.search)
  const debounceFnRef = useRef<DebouncedFunc<(value: any) => void>>()
  const debounceFn = debounce((value) => {
    // console.log('要防抖的代码逻辑执行了', value)
    dispatch(getSuggestion(value))
  }, 500)
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  useEffect(() => {
    const localHistory = JSON.parse(localStorage.getItem(GEEK_SEARCH_KEY) ?? "[]") as string[]
    setSearchHistory(localHistory)
  }, [])
  if (!debounceFnRef.current) {
    debounceFnRef.current = debounceFn
  }
  const [searchText, setSearchText] = useState("")
  const onSearchChange = (value: string) => {
    setSearchText(value)
    if (value.trim() === "") {
      return dispatch(clearSuggestion())
    }

    // debounceFn(value)
    debounceFnRef.current?.(value)
  }
  // const { run: debounceFn } = useDebounceFn(
  //   (value) => {
  //     dispatch(getSuggestion(value))
  //   },
  //   {
  //     wait: 500,
  //   }
  // )
  /*
    ['012'] => [ { left: '0', search: '1', right: '2' } ]
  */
  // console.log(suggestion)

  const highlightSuggestion = suggestion.map((item) => {
    // if (item) {
    //   return ""
    // }
    // console.log(item)
    // 将搜索内容以及返回的联想关键词结果，全部转化为小写再比较，屏蔽大小写的差异
    const lowerSearchText = searchText.toString().toLowerCase()
    const lowerSuggestionItem = item ? item.toString().toLowerCase() : ""

    // 先找到与关键词匹配的内容，所在的位置
    const searchIndex = lowerSuggestionItem.indexOf(lowerSearchText)

    // 根据关键词的位置，将搜索结果分为 左、中、右 三部分
    // 左：0 -> searchIndex
    // 中：searchIndex -> searchIndex + lowerSearchText.length
    // 右：searchIndex + lowerSearchText.length -> 最后
    const left = item?.slice(0, searchIndex)
    const search = item?.slice(searchIndex, searchIndex + lowerSearchText.length)
    const right = item?.slice(searchIndex + lowerSearchText.length)

    return {
      left,
      search,
      right,
      raw: item,
    }
  })
  const saveHistories = (value: string) => {
    // 1. 创建保存历史记录的函数 saveHistories
    // 2. 从本地缓存中获取到历史记录，判断本地缓存中是否有历史记录数据
    let localHistory = JSON.parse(localStorage.getItem(GEEK_SEARCH_KEY) ?? "[]") as string[]
    if (localHistory.length === 0) {
      // 3. 如果没有，直接添加当前搜索内容到历史记录中
      localHistory = [value]
    } else {
      // 4. 如果有，判断是否包含当前搜索内容
      if (localHistory.indexOf(value) > -1) {
        // 6. 如果包含，将其移动到第一个
        localHistory = [value, ...localHistory.filter((item) => item !== value)]
      } else {
        // 5. 如果没有包含，直接添加到历史记录中
        localHistory = [value, ...localHistory]
      }
    }
    // 7. 将最新的历史记录存储到本地缓存中
    localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(localHistory))
  }
  const onSearch = (value: string) => {
    if (value) {
      dispatch(clearSuggestion())
      history.push(`/search/result?q=${value}`)
      saveHistories(value)
    }
  }
  // 清空所有历史记录
  const onClearAllHistory = () => {
    localStorage.removeItem(GEEK_SEARCH_KEY)
    setSearchHistory([])
  }
  // 删除单个历史记录
  const onDeleteHistory = (value: string) => {
    return () => {
      const localHistory = JSON.parse(localStorage.getItem(GEEK_SEARCH_KEY) ?? "[]") as string[]
      const newHistory = localHistory.filter((item) => item !== value)
      localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(newHistory))

      setSearchHistory(newHistory)
    }
  }
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={
          <span className="search-text" onClick={() => onSearch(searchText)}>
            搜索
          </span>
        }
      >
        <SearchBar placeholder="请输入关键字搜索" value={searchText} onChange={onSearchChange} />
      </NavBar>

      {searchText === "" && (
        <div
          className="history"
          style={{
            display: searchHistory.length <= 0 ? "none" : "block",
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span onClick={onClearAllHistory}>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            {searchHistory.map((item, index) => (
              <span key={index} className="history-item">
                <span className="text-overflow" onClick={() => onSearch(item)}>
                  {item}
                </span>
                <Icon type="iconbtn_essay_close" onClick={onDeleteHistory(item)} />
              </span>
            ))}
          </div>
        </div>
      )}

      <div
        className={classNames("search-result", {
          show: suggestion.length > 0,
        })}
      >
        {highlightSuggestion.map((item, index) => (
          <div key={index} className="result-item" onClick={() => onSearch(item.raw)}>
            <Icon className="icon-search" type="iconbtn_search" />
            <div className="result-value text-overflow">
              {/* span 包裹的内容会有高亮效果 */}
              {item.left}
              <span>{item.search}</span>
              {item.right}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
