import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from "./components/layout/NavBar"
import Dashboard from './components/layout/Dashboard';
import PatternBg1 from "../src/components/other/pattern1.png";
import Pokemon from './components/pokemon/Pokemon';
import MyPokeList from "./components/pokemon/MyPokeList";

function App() {
  return (
    <Router>
      <div className="App" style={{background:`url(${PatternBg1})`}}>
        <NavBar/>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
            <Route exact path="/mypokemon" component={MyPokeList}/>
          </Switch>
        </div>
      </div>
    </Router>

  );
}

export default App;
