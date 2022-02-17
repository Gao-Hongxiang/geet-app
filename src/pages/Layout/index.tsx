import { Route } from "react-router-dom"
import { TabBar } from "antd-mobile"
import styles from "./index.module.scss"

import Icon from "@/components/Icon"

// 导入页面组件，配置路由
import Home from "@/pages/Home"
import Question from "@/pages/Question"
import Video from "@/pages/Video"
import Profile from "@/pages/Profile"
import { useLocation, useHistory } from "react-router"
import { KeepAlive } from "@/components/KeepAlive"
const tabs = [
  { path: "/home", icon: "iconbtn_home", text: "首页" },
  { path: "/home/question", icon: "iconbtn_qa", text: "问答" },
  { path: "/home/video", icon: "iconbtn_video", text: "视频" },
  { path: "/home/profile", icon: "iconbtn_mine", text: "我的" },
]

const Layout = () => {
  const history = useHistory()
  const location = useLocation()

  const changeTabBar = (key: string) => {
    history.push(key)
  }

  return (
    <div className={styles.root}>
      {/* 二级嵌套路由 */}
      {/* <Route
        exact
        path="/home"
        render={() => {
          return <Redirect to="/home/index"></Redirect>
        }}
      /> */}
      <KeepAlive exact path="/home">
        <Home />
      </KeepAlive>
      <Route path="/home/question">
        <Question></Question>
      </Route>
      <Route path="/home/video">
        <Video></Video>
      </Route>
      <Route path="/home/profile">
        <Profile></Profile>
      </Route>

      <TabBar className="tab-bar" onChange={changeTabBar} activeKey={location.pathname}>
        {tabs.map((item) => (
          <TabBar.Item key={item.path} icon={(active: boolean) => <Icon type={active ? `${item.icon}_sel` : item.icon} className="tab-bar-item-icon" />} title={item.text} />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
