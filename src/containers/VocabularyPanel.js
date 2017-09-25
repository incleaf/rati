import React, { Component } from 'react';
import VocabularyList from './VocabularyList';
import firebase from 'firebase';

class VocabularyPanel extends Component {
  constructor(props) {
    super(props);
    this.uid = firebase.auth().currentUser.uid;
    this.ref = firebase.database().ref(`users/${this.uid}`);
    this.vocabulariesRef = firebase.database().ref(`users/${this.uid}/vocabularies`);
  }

  state = {
    inputText: '',
    vocabularies: [],
  };

  componentDidMount() {
    this.vocabulariesRef.orderByChild('timestamp').once('value').then(snapshot => {
      const vocabularies = [];
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        vocabularies.unshift({
          ...childData,
          _key: childKey,
        });
      });
      this.setState({ vocabularies });

      const lastIdInSnapshot = vocabularies.length
        ? vocabularies[0]._key
        : '';

      this.vocabulariesRef.orderByKey().startAt(lastIdInSnapshot).on('child_added', snapshot => {
        if (snapshot.key === lastIdInSnapshot) {
          return;
        }
        this.setState({
          vocabularies: [{
            ...snapshot.val(),
            _key: snapshot.key,
          }, ...(this.state.vocabularies)]
        })
      });

      this.vocabulariesRef.on('child_changed', snapshot => {
        console.log(`child_changed: ${snapshot.val()}`);
      });

      this.vocabulariesRef.on('child_removed', snapshot => {
        console.log(`child_removed: ${snapshot.val()}`);
      });
    })
  }


  handleInputChange = e => {
    this.setState({ inputText: e.target.value })
  }

  handleInputKeyPress = e => {
    if (e.key === 'Enter') {
      this.addVocabulary(this.state.inputText);
      this.setState({ inputText: '' });
    }
  }

  addVocabulary = (vocabulary) => {
    this.vocabulariesRef.push({
      value: vocabulary,
      timestamp: Date.now(),
    });
  }

  render() {
    const { inputText, vocabularies } = this.state;

    return (
      <div>
        <input
          type="text"
          value={inputText}
          placeholder="Type word or phrase"
          onChange={this.handleInputChange}
          onKeyPress={this.handleInputKeyPress}
        />
        <VocabularyList vocabularies={vocabularies} />
      </div>
    );
  }
}

export default VocabularyPanel;
