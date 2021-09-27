import React from "react";

import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Authentication";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" exact component={Login} />
    </Router>
  );
}

export default App;
