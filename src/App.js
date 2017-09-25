import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Login from './components/Login';
import firebase from 'firebase';

const provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  state = {
    isLoggedIn: false,
    isInitialized: false,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isLoggedIn: !!user,
        isInitialized: true,
      });
    });
  }

  handleLoginClick = () => {
    firebase.auth().signInWithPopup(provider).then(result => {
      this.setState({ isLoggedIn: true });
    }).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Rati</h1>
        {this.state.isLoggedIn
          ? <p>Logged in</p>
          : <Login handleLoginClick={this.handleLoginClick} />
        }
      </div>
    );
  }
}

export default App;
