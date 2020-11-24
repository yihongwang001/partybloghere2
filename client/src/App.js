import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Party from "./components/parties/partyPage";
import NewVenue from "./components/parties/newVenue";

import React from "react";
// Clear structure to render pages by using react-router. It allows navigation without the page refreshing as the user navigates.
// Apparently, there are many benefits when using react-router, like better use experience and fast rendering time.
// However, I think it should also be careful when using react-router as the initial loading time could be considerably large. 
// Plus, there could be unnecessary data download time for unusable views when the application fisrt render.
const Routes = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/partyPage" component={Party} />
        <Route exact path="/newVenue" component={NewVenue} />
      </div>
    </Router>
  );
};

function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
