// 导入路由
import { Router, Route, Switch, Redirect } from "react-router-dom"
import AuthRoute from "./components/  AuthRoute"
import ProfileEdit from "@/pages/Profile/Edit"
// 导入页面组件
import Login from "./pages/Login"
import Layout from "./pages/Layout"
import { customHistory } from "./utils/history"
import Chat from "./pages/Profile/Chat"
import Article from "./pages/Article"
import Search from "./pages/Search"
import SearchResult from "./pages/Search/Result"
import "./App.scss"
function App() {
  return (
    <Router history={customHistory}>
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home/index" />} />;
          <Route path="/home" component={Layout} />
          <Route path="/login" component={Login} />
          <Route path="/chat" component={Chat} />
          <Route path="/articles/:id" component={Article} />
          <Route exact path="/search" component={Search} />
          <Route path="/search/result" component={SearchResult} />
          <AuthRoute path="/profile/edit">
            <ProfileEdit />
          </AuthRoute>
        </Switch>
      </div>
    </Router>
  )
}

export default App
