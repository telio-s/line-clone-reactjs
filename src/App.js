import React, { useState, useEffect } from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import Dashboard from "./Page/Dashboard";
import Login from "./Page/LogIn";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Auth, Hub } from "aws-amplify";

function App() {
  return (
    <Router>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" exact component={Login} />
    </Router>
  );
}

export default App;
