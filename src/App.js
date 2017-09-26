import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Login from './components/Login';
import VocabularyPanel from './containers/VocabularyPanel';
import firebase from 'firebase';

const provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  state = {
    isLoggedIn: false,
    isInitialized: false,
    displayName: '',
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isLoggedIn: !!user,
        displayName: user ? user.displayName : '',
        isInitialized: true,
      });
    });
  }

  handleLoginClick = () => {
    firebase.auth().signInWithPopup(provider).then(result => {
      this.setState({ isLoggedIn: true });
    }).catch(error => {
      console.warn(error);
    });
  }

  handleLogoutClick = () => {
    firebase.auth().signOut().then(() => {
      this.setState({
        isLoggedIn: false,
        displayName: '',
      })
    }).catch(e => {
      console.warn(e);
      alert('An error occurred. Please try again.');
    });
  }

  render() {
    const { isLoggedIn, isInitialized, displayName } = this.state;

    if (!isInitialized) {
      return <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

    return (
      <div className="app">
        <h1 className="app__title">Rati</h1>
        {displayName &&
        <p className="app__welcome">
          Welcome, {displayName}.
          <button className="app__btn-logout" onClick={this.handleLogoutClick}>
            <a href="javascript:void(0);">Logout</a>
          </button>
        </p>}
        {this.state.isLoggedIn
          ? <VocabularyPanel />
          : <Login handleLoginClick={this.handleLoginClick} />
        }
      </div>
    );
  }
}

export default App;
