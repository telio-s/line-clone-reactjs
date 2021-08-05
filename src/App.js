import React, { useState, useEffect } from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import ChatDashboard from "./Components/ChatDashboard";
import Dashboard from "./Page/Dashboard";
import Login from "./Page/LogIn";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Auth, Hub } from "aws-amplify";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/login" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
      </div>
    </Router>
  );
}

export default App;
