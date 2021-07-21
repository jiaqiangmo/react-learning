import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import store from './app/store'
import { Navbar } from "./app/Navbar";
import { UserList } from "./features/users/UsersList";
import { fetchUsers } from './features/users/UserSlice'
store.dispatch(fetchUsers())

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <UserList />
              </React.Fragment>
            )}
          />
          <Route exact path="/users" component={UserList} />
          <Redirect to="/users" />
        </Switch>
      </div>
    </Router>
  )
}


export default App;
