import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/types/store"
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
