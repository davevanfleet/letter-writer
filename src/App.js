import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Territory from './components/Territory';
import Layout from './containers/Layout';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/territories/:territoryId' render={routerProps => {return <Territory territoryId={routerProps.match.params.territoryId} />}} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
