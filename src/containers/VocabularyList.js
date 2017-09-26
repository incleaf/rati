import React, { Component } from 'react';
import VocabularyListItem from '../components/VocabularyListItem';

import './VocabularyList.css';

class VocabularyList extends Component {
  render() {
    return (
      <div>
        <ul className="vocablist">
          {this.props.vocabularies.map((vocabulary) => {
            return (
              <VocabularyListItem key={vocabulary._key} value={vocabulary.value} />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default VocabularyList;