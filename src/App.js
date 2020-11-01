import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routing from "./routes/routing";

const App = () => {
  const [user, setUser] = React.useState({});

  return (
    <div className="App">
      <Router>
        <Routing user={user} setUser={setUser} />
      </Router>
    </div>
  );
};

export default App;
