import React, { Component } from 'react';
import VocabularyListItem from '../components/VocabularyListItem';

class VocabularyList extends Component {
  render() {
    return (
      <div>
        <ul>
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