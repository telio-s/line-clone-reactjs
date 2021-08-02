import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import FormLoginEmail from "./Components/FormLoginEmail";
import FormLoginSmartphone from "./Components/FormLoginSmartphone";
import Login from "./Page/LogIn";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/login" exact component={Login} />
      </div>
    </Router>
  );
}

export default App;
