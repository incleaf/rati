import React, { Component } from 'react';
import VocabularyListItem from '../components/VocabularyListItem';

import './VocabularyList.css';

class VocabularyList extends Component {
  render() {
    const { vocabularies } = this.props;

    return (
      <div>
        <ul className="vocablist">
          {vocabularies.length
            ? vocabularies.map((vocabulary) => {
              return (
                <VocabularyListItem key={vocabulary._key} value={vocabulary.value} />
              );
            })
            : <p>Vocabulary is empty. Why don't you add something?</p>
          }
        </ul>
      </div>
    );
  }
}

export default VocabularyList;