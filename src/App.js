import React, { Component } from 'react';
import { BrowserRouter as Router,
         Switch,
         Route } from 'react-router-dom';
import Layout from './containers/Layout';
import './App.css';
import { config } from './constants';
import Errors from './components/Errors';
import Home from './components/Home';
import Territories from './containers/Territories';
import DNCs from './containers/DNCs';
import LoginForm from './components/LoginForm';
import DNCIndex from './components/DNCIndex';
import DNCUpload from './components/DNCUpload';
import UploadContacts from './components/UploadContacts';

class App extends Component {
  state = {
    currentUser: null,
    errors: null,
    flash: ''
  }
  
  componentDidMount(){
    const getCurrentUser = (token) => {
      fetch(`${config.url.API_URL}/get_current_user`, {
        headers: {
          "Auth": token
        }
      })
      .then(r => r.json())
      .then(json => {
          const user = JSON.parse(json.user)
          this.setState({
            currentUser: user,
            errors: null
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

    fetch(`${config.url.API_URL}/login`, configObj)
      .then(r => r.json())
      .then(json => {
        if(json.error){throw json.error}
        const user = JSON.parse(json.user)
        this.setState({
          currentUser: user
        })
        localStorage.setItem('token', json.jwt)
      })
      .catch(e => {
        this.setState({
          errors: e
        })
      })
  }

  logout = (e) => {
    e.preventDefault()
    localStorage.clear()
    this.setState({
      currentUser: null
    })
  }

  addFlash = (message) => {
      this.setState({flash: message})
      setTimeout(() => {
        this.setState({flash: ''})
      }, 5000)
  }


  render(){
    if (this.state.currentUser){
      return (
        <div className="App">
          <Router>
            <Layout currentUser={this.state.currentUser}
                    logout={this.logout}
                    flash={this.state.flash}>
              <Switch>
                <Route exact path="/">
                  <Home currentUser={this.state.currentUser}/>
                </Route>
                <Route exact path="/territories">
                  <Territories currentUser={this.state.currentUser} />
                </Route>
                <Route exact path="/upload_contacts">
                  <UploadContacts currentUser={this.state.currentUser} addFlash={this.addFlash}/>
                </Route>
                <Route exact path="/DNCs">
                  <DNCs currentUser={this.state.currentUser} />
                </Route>
                <Route exact path="/all_DNCs">
                  <DNCIndex currentUser={this.state.currentUser} />
                </Route>
                <Route exact path="/upload_DNCs">
                  <DNCUpload currentUser={this.state.currentUser} />
                </Route>
              </Switch>
            </Layout>
          </Router>
        </div>
      )
    }
    else {
      return (
        <div className="App">
          <Router>
            <Layout currentUser={this.state.currentUser}
                    logout={this.logout}
                    flash={this.state.flash}>
              {this.state.errors ? <Errors error={this.state.errors} /> : null}
              <LoginForm login={this.login} />
            </Layout>
          </Router>
        </div>
      )
    }
  }
}

export default App;
