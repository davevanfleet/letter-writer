import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './containers/Layout';
import './App.css';
import Home from './containers/Home';
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
      .then(json => {
        console.log(json)
        const user = JSON.parse(json.user)
        this.setState({
          currentUser: user
        })
        localStorage.setItem('token', json.jwt)
      })
      .catch(e => {
        console.log(e)
      })
  }

  logout = (e) => {
    e.preventDefault()
    localStorage.clear()
    this.setState({
      currentUser: null
    })
  }


  render(){
    if (this.state.currentUser){
      return (
        <div className="App">
          <Router>
            <Layout currentUser={this.state.currentUser} logout={this.logout}>
              <Home />
            </Layout>
          </Router>
        </div>
      )
    }
    else {
      return (
        <div className="App">
          <Router>
            <Layout currentUser={this.state.currentUser} logout={this.logout}>
              <LoginForm login={this.login} />
            </Layout>
          </Router>
        </div>
      )
    }
  }
}

export default App;
