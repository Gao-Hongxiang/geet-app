import { getToken } from "@/utils/auth"
import { Redirect, Route, RouteProps } from "react-router"
import { useLocation } from "react-router-dom"

const AuthRoute = ({ children, ...rest }: RouteProps) => {
  const location = useLocation()

  return (
    <Route
      {...rest}
      render={() => {
        const isLogin = (): boolean => {
          return !!getToken()
        }
        if (isLogin()) {
          return children
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location.pathname,
              },
            }}
          />
        )
      }}
    />
  )
}
export default AuthRoute
