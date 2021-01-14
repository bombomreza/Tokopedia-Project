import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from "./components/layout/NavBar"
import Dashboard from './components/layout/Dashboard';
import PatterBg from "../src/components/other/pattern.png";
import Pokemon from './components/pokemon/Pokemon';
function App() {
  return (
    <Router>
      <div className="App" style={{background:`url(${PatterBg})`}}>
        <NavBar/>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
          </Switch>
        </div>
      </div>
    </Router>

  );
}

export default App;
