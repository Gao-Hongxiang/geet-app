// 导入路由
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"

// 导入页面组件
import Login from "./pages/Login"
import Layout from "./pages/Layout"

import "./App.scss"

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />;
          <Route path="/home" component={Layout} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
