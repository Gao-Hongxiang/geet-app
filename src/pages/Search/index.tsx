import classNames from "classnames"
import { useHistory } from "react-router"
import { clearSuggestion } from "@/store/actions/search"
// import { useDebounceFn } from "ahooks"
import debounce from "lodash/debounce"
import { NavBar, SearchBar } from "antd-mobile"
import { getSuggestion } from "@/store/actions/search"
import Icon from "@/components/Icon"
import styles from "./index.module.scss"
import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DebouncedFunc } from "lodash"
import { RootState } from "@/types/store"
const SearchPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { suggestion } = useSelector((state: RootState) => state.search)
  const debounceFnRef = useRef<DebouncedFunc<(value: any) => void>>()
  const debounceFn = debounce((value) => {
    // console.log('要防抖的代码逻辑执行了', value)
    dispatch(getSuggestion(value))
  }, 500)
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
  console.log(suggestion)

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
    }
  })
  return (
    <div className={styles.root}>
      <NavBar className="navbar" onBack={() => history.go(-1)} right={<span className="search-text">搜索</span>}>
        <SearchBar placeholder="请输入关键字搜索" value={searchText} onChange={onSearchChange} />
      </NavBar>

      {true && (
        <div
          className="history"
          style={{
            display: true ? "none" : "block",
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            <span className="history-item">
              <span className="text-overflow">黑马程序员</span>
              <Icon type="iconbtn_essay_close" />
            </span>
          </div>
        </div>
      )}

      <div
        className={classNames("search-result", {
          show: suggestion.length > 0,
        })}
      >
        {highlightSuggestion.map((item, index) => (
          <div key={index} className="result-item">
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
