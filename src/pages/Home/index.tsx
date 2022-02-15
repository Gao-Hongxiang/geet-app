import Icon from "@/components/Icon"
import { Tabs, Popup } from "antd-mobile"

import { changechannelActiveKey, getUserChannel } from "@/store/actions/home"
import styles from "./index.module.scss"
import { useHistory } from "react-router-dom"
import Channels from "./components/Channels"
import { useState } from "react"
import ArticleList from "./components/ArticleList"
import { useDispatch, useSelector } from "react-redux"
import { useInitialState } from "@/utils/use-initial-state"
import { RootState } from "@/types/store"
const Home = () => {
  const dispatch = useDispatch()
  const { channelActiveKey } = useSelector((state: RootState) => state.home)
  const history = useHistory()
  const [channelVisible, setChannelVisible] = useState(false)
  // 频道管理弹出层展示
  const onChannelShow = () => setChannelVisible(true)
  const onTabChange = (key: string) => {
    dispatch(changechannelActiveKey(key))
  }
  // 频道管理弹出层隐藏
  const onChannelHide = () => setChannelVisible(false)
  const { useChannels } = useInitialState(getUserChannel, "home")
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      {useChannels.length > 0 && (
        <Tabs className="tabs" activeLineMode="fixed" activeKey={channelActiveKey} onChange={onTabChange}>
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
        <Icon type="iconbtn_channel" onClick={onChannelShow} />
      </div>
      {/* 频道管理 - 弹出层 */}
      <Popup visible={channelVisible} className="channel-popup" position="left" onMaskClick={onChannelHide}>
        <Channels onClose={onChannelHide} />
      </Popup>
    </div>
  )
}

export default Home
