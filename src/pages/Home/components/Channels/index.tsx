import classNames from "classnames"
import { useInitialState } from "@/utils/use-initial-state"
import { changechannelActiveKey, getAllChannel, delChannel } from "@/store/actions/home"
import Icon from "@/components/Icon"
import styles from "./index.module.scss"
import { useSelector } from "react-redux"
import { RootState } from "@/types/store"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Channel } from "@/types/data"

type Props = {
  onClose: () => void
}

const Channels = ({ onClose }: Props) => {
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const onChannelClick = (channel: Channel) => {
    if (!isEdit) {
      dispatch(changechannelActiveKey(channel.id + ""))
      onClose()
      return
    }
    if (channel.id === 0) return
    if (useChannels.length <= 4) return
    dispatch(delChannel(channel))
  }
  const onChangeEdit = () => {
    setIsEdit((isEdit) => {
      return !isEdit
    })
  }
  const { useChannels } = useSelector((state: RootState) => state.home)
  const { restChannel, channelActiveKey } = useInitialState(getAllChannel, "home")

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classNames("channel-item", isEdit && "edit")}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            <span className="channel-item-edit" onClick={onChangeEdit}>
              {isEdit ? "保存" : "编辑"}
            </span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {useChannels.map((item) => (
              <span key={item.id} className={classNames("channel-list-item", channelActiveKey === item.id + "" && "selected")} onClick={() => onChannelClick(item)}>
                {item.name}
                <Icon type="iconbtn_tag_close" />
              </span>
            ))}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {restChannel.map((item) => (
              <span key={item.id} className="channel-list-item">
                + {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
