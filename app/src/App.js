import React, { Component } from 'react';
import { BrowserRouter as Router,
         Switch,
         Route, 
         Redirect} from 'react-router-dom';
import Layout from './components/Layout';
import './App.css';
import { config } from './constants';
import Errors from './components/Errors';
import Home from './components/Home';
import Territories from './components/territoryComponents/Territories';
import DNCs from './components/dncComponents/DNCs';
import LoginForm from './components/LoginForm';
import DNCIndex from './components/dncComponents/DNCIndex';
import DNCUpload from './components/uploadsComponents/DNCUpload';
import UploadContacts from './components/uploadsComponents/UploadContacts';
import NewTerritory from './components/territoryComponents/NewTerritory';
import {GoogleApiWrapper} from 'google-maps-react';
import Register from './components/registerComponents/Register';
import Publishers from './components/usersComponents/Publishers';
import NewPublisher from './components/usersComponents/NewPublisher';
import ConfirmNewUser from './components/usersComponents/ConfirmNewUser';

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
                <Route exact path="/login">
                  <Redirect to="/" />
                </Route>
                <Route exact path="/territories">
                  <Territories currentUser={this.state.currentUser} />
                </Route>
                <Route exact path="/new_territory">
                  <NewTerritory currentUser={this.state.currentUser} />
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
                  <DNCUpload currentUser={this.state.currentUser} addFlash={this.addFlash}/>
                </Route>
                <Route exact path="/users">
                  <Publishers currentUser={this.state.currentUser} />
                </Route>
                <Route exact path="/create_user">
                  <NewPublisher currentUser={this.state.currentUser} />
                </Route>
                <Route>
                  <Home currentUser={this.state.currentUser}/>
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
              <Switch>
                <Route exact path="/">
                  <Home currentUser={this.state.currentUser}/>
                </Route>
                <Route exact path="/login">
                  <LoginForm login={this.login} />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
                <Route path="/confirm/:token">
                  <ConfirmNewUser />
                </Route>
                <Route>
                  <LoginForm login={this.login} />
                </Route>
              </Switch>
            </Layout>
          </Router>
        </div>
      )
    }
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ['geometry']
})(App)
