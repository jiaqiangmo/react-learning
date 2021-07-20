import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar } from "./app/Navbar";
import { UserList } from "./features/users/UsersList";

function App() {
  return (
    <Router>
      <Navbar>
        <div className="App">
          <Switch>
            <Route
              path="/"
              render={() => (
                <React.Fragment>
                  <div>alksdfjklsajdflksjlfkjskl</div>
                </React.Fragment>
              )}
            />
            <Route component={Navbar}></Route>
            <Route path="/users" component={UserList} />
          </Switch>
        </div>
      </Navbar>
    </Router>
  );
}

export default App;
