import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Territory from './components/Territory';
import Layout from './containers/Layout';
import './App.css';
import Home from './components/Home';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {
    currentUser: null
  }
  
  componentDidMount(){
    const getCurrentUser = (token) => {
      fetch(`http://localhost:8080/get_current_user`, {
        headers: {
          "Auth": token
        }
      })
      .then(r => r.json())
      .then(json => {
          const user = JSON.parse(json.user)
          this.setState({
            currentUser: user
          })
      })
    }
    const token = localStorage.getItem("token")
    if(token){getCurrentUser(token)}
  }

  login = (e) => {
    e.preventDefault()
    const credentials = {
      username: e.target[0].value,
      password: e.target[1].value
    }
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": 'application/json'
      },
      body: JSON.stringify(credentials)
    }

    fetch("http://localhost:8080/login", configObj)
      .then(r => r.json())
      .then(data => {
        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
  }


  render(){
    return (
      <div className="App">
        <Router>
          <Layout>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route extact path='/login' render={() => <LoginForm login={this.login}/> } />
                <Route path='/territories/:territoryId' render={routerProps => {return <Territory territoryId={routerProps.match.params.territoryId} />}} />
            </Switch>
          </Layout>
        </Router>
      </div>
    )
  }
}

export default App;
