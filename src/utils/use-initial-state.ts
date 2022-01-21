import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/types/store"
export const useInitialState = <StateName extends keyof RootState>(
  action: () => void,
  // stateName: keyof RootState
  stateName: StateName
) => {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => {
    return state[stateName]
  })
  useEffect(() => {
    dispatch(action())
  }, [dispatch, action])
  return state
}
