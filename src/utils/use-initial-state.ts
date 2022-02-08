import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/types/store"
import { Dialog } from "antd-mobile"
import { useHistory } from "react-router"
export const useInitialState = <StateName extends keyof RootState>(
  action: () => void,
  // stateName: keyof RootState
  stateName: StateName
) => {
  const actionRef = useRef(action)
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => {
    return state[stateName]
  })
  useEffect(() => {
    dispatch(actionRef.current())
  }, [dispatch])
  return state
}
//检查当前登陆状态
export const useAuthSet = () => {
  const history = useHistory<{ from: string }>()
  const token = useSelector((state: RootState) => {
    return state.login.token
  })

  useEffect(() => {
    if (!token) {
      const handler = Dialog.show({
        title: "温馨提示",
        content: "亲，检测到您未登录，如需要继续操作，需要进行登陆组册",
        actions: [
          [
            {
              key: "cancel",
              text: "去登陆",
              onClick: () => {
                handler.close()
                history.push("/login", { from: history.location.pathname })
              },
            },
            {
              key: "confirm",
              text: "放弃操作",
              style: {
                color: "var(--adm-color-weak)",
              },
              onClick: () => {
                handler.close()
              },
            },
          ],
        ],
      })
    }
  }, [history, token])
  return !!token
}

export const useResetRedux = <KeyName extends keyof RootState>(stateName: KeyName) => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch({ type: "reset", payload: stateName })
    }
  }, [dispatch, stateName])
}
