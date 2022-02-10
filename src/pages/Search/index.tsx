import classnames from "classnames"
import { useHistory } from "react-router"
// import debounce from "lodash/debounce"
import { NavBar, SearchBar } from "antd-mobile"
import { getSuggestion } from "@/store/actions/search"
import Icon from "@/components/Icon"
import styles from "./index.module.scss"
import { useState } from "react"
import { useDispatch } from "react-redux"
const SearchPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [searchTxt, setSearchTxt] = useState("")
  const onSearchChange = (value: string) => {
    setSearchTxt(value)
    dispatch(getSuggestion(value))
  }
  return (
    <div className={styles.root}>
      <NavBar className="navbar" onBack={() => history.go(-1)} right={<span className="search-text">搜索</span>}>
        <SearchBar placeholder="请输入关键字搜索" value={searchTxt} onChange={onSearchChange} />
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

      <div className={classnames("search-result", true ? "show" : "")}>
        <div className="result-item">
          <Icon className="icon-search" type="iconbtn_search" />
          <div className="result-value text-overflow">
            <span>黑马</span>
            程序员
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
