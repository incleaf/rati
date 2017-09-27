import React, { Component } from 'react';
import VocabularyList from './VocabularyList';
import firebase from 'firebase';
import { getNextDisplayAt } from '../utils';
import './VocabularyPanel.css';

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
    defferedCount: 0,
  };

  componentDidMount() {
    this.vocabulariesRef.orderByChild('timestamp').once('value').then(snapshot => {
      const vocabularies = [];
      const now = Date.now();
      let defferedCount = 0;
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        if (childData.displayAt <= now) {
          vocabularies.unshift({
            ...childData,
            _key: childKey,
          });
        } else {
          defferedCount = defferedCount + 1;
        }
      });
      this.setState({ vocabularies, defferedCount });

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
        const newVocabularies = this.state.vocabularies.map(vocabulary => {
          if (vocabulary._key !== snapshot.key) {
            return vocabulary;
          }
          return {
            ...snapshot.val(),
            _key: snapshot.key,
          };
        });
        this.setState({ vocabularies: newVocabularies });
        console.log(`child_changed: ${snapshot.val()}`);
      });

      this.vocabulariesRef.on('child_removed', snapshot => {
        const newVocabularies = this.state.vocabularies.filter(vocabulary => {
          return vocabulary._key !== snapshot.key
        });
        this.setState({ vocabularies: newVocabularies });
      });
    })
  }


  handleInputChange = e => {
    this.setState({ inputText: e.target.value })
  }

  handleInputKeyPress = e => {
    if (e.key === 'Enter') {
      this.addInputTextToVocabulary();
    }
  }

  handleAddButtonClick = () => {
    this.addInputTextToVocabulary();
  }

  addInputTextToVocabulary = () => {
    if (this.state.inputText.length < 2) {
      return;
    }
    this.addVocabulary(this.state.inputText);
    this.setState({ inputText: '' });
  }

  addVocabulary = (vocabulary) => {
    this.vocabulariesRef.push({
      value: vocabulary,
      displayAt: Date.now(),
      memorizationLevel: 1,
    });
  }

  achieveVocabulary = (data) => {
    this.vocabulariesRef.update({
      [data._key]: {
        value: data.value,
        displayAt: getNextDisplayAt(data.memorizationLevel),
        prevDisplayAt: data.displayAt,
        memorizationLevel: data.memorizationLevel + 1,
        _key: data._key,
      },
    });
    this.setState({ defferedCount: this.state.defferedCount + 1 });
  }

  undoAchieveVocabulary = (data) => {
    this.vocabulariesRef.update({
      [data._key]: {
        value: data.value,
        displayAt: data.prevDisplayAt,
        prevDisplayAt: null,
        memorizationLevel: data.memorizationLevel - 1,
        _key: data._key,
      },
    });
    this.setState({ defferedCount: this.state.defferedCount - 1 });
  }

  deleteVocabulary = data => {
    firebase.database().ref(`users/${this.uid}/vocabularies/${data._key}`).remove();
  }

  editVocabulary = data => {

  }

  render() {
    const { inputText, vocabularies, defferedCount } = this.state;
    const vocabLength = vocabularies.length;
    return (
      <div className="vocapanel">
        {vocabLength > 0 &&
          <p className="vocapanel__status">
            <i>{defferedCount} vocabularies have been deffered out of {vocabLength}</i>
          </p>
        }
        <div className="vocapanel__form">
          <input
            className="vocapanel__input"
            type="text"
            value={inputText}
            placeholder="Type word or phrase"
            onChange={this.handleInputChange}
            onKeyPress={this.handleInputKeyPress}
          />
          <button className="vocapanel__btn-add" onClick={this.handleAddButtonClick}>
            Add to vocab.
          </button>
        </div>
        <VocabularyList
          vocabularies={vocabularies}
          achieveVocabulary={this.achieveVocabulary}
          undoAchieveVocabulary={this.undoAchieveVocabulary}
          deleteVocabulary={this.deleteVocabulary}
        />
      </div>
    );
  }
}

export default VocabularyPanel;
