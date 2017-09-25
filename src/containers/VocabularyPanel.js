import React, { Component } from 'react';
import VocabularyList from './VocabularyList';

class VocabularyPanel extends Component {
  state = {
    inputText: '',
  }

  render() {
    const { inputText } = this.state;

    return (
      <div>
        <input type="text" value={inputText} />
        <VocabularyList />
      </div>
    );
  }
}

export default VocabularyPanel;