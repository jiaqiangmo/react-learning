import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import { Navbar } from "./app/Navbar";
import { UserList } from "./features/users/UsersList";
import { UserPage } from "./features/users/UserPage";

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
          <Route exact path="/users/:userId" component={UserPage} />
          <Redirect to="/users" />
        </Switch>
      </div>
    </Router>
  )
}


export default App;
