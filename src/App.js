import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import ChatDashboard from "./Components/ChatDashboard";
import Dashboard from "./Page/Dashboard";
import Login from "./Page/LogIn";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <Route path="/login" exact component={Login} />
    //     <Route path="/dashboard" exact component={Dashboard} />
    //   </div>
    // </Router>
    <AmplifySignOut />
  );
}

export default withAuthenticator(App);
