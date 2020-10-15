import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routing from "./routes/routing";

const App = () => (
  <div className="App">
    <Router>
      <Routing />
    </Router>
  </div>
);

export default App;
