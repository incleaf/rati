import React, { Component } from 'react';
import VocabularyList from './VocabularyList';

class VocabularyPanel extends Component {
  state = {
    inputText: '',
    vocabularies: [],
  };

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
    this.setState({
      vocabularies: [vocabulary, ...(this.state.vocabularies)],
    })
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
