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
      console.warn(error);
    });
  }

  render() {
    const { isLoggedIn, isInitialized } = this.state;

    if (!isInitialized) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <h1>Rati</h1>
        {this.state.isLoggedIn
          ? <VocabularyPanel />
          : <Login handleLoginClick={this.handleLoginClick} />
        }
      </div>
    );
  }
}

export default App;
