import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routing from "./routes/routing";
import Canvas from "./components/Canvas/index.jsx";
import useWindowDimensions from "./components/Window";

const App = () => {
  const [user, setUser] = React.useState({});
  const { height, width } = useWindowDimensions();
  console.log(Canvas);

  return (
    <div className="App">
      <Router>
        <Routing user={user} setUser={setUser} />
      </Router>
      {/* <Canvas height={height} width={width}></Canvas> */}
    </div>
  );
};

export default App;
