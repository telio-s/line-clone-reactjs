import React, { useEffect, useRef } from "react";
import Dashboard from "./Pages/Dashboard";
import Authentication from "./Pages/Authentication";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { checkCurrentUser } from "./utils/authentication/utils";

function App() {
  let user = useRef(null);
  useEffect(() => {
    async function currentUser() {
      user = await checkCurrentUser();
    }
    currentUser();
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/" component={Authentication} />
      </Switch>
    </Router>
  );
}

export default App;
