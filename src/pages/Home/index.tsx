import Icon from "@/components/Icon"
import { Tabs } from "antd-mobile"
import { getUserChannel } from "@/store/actions/home"
import styles from "./index.module.scss"
import { useHistory } from "react-router-dom"

import ArticleList from "./components/ArticleList"
import { useInitialState } from "@/utils/use-initial-state"
const Home = () => {
  const history = useHistory()

  const { useChannels } = useInitialState(getUserChannel, "home")
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      {useChannels.length > 0 && (
        <Tabs className="tabs" activeLineMode="fixed">
          {useChannels.map((item) => {
            return (
              <Tabs.Tab title={item.name} key={item.id}>
                <ArticleList channelId={item.id} />
              </Tabs.Tab>
            )
          })}
        </Tabs>
      )}
      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={() => history.push("/search")} />
        <Icon type="iconbtn_channel" />
      </div>
    </div>
  )
}

export default Home
