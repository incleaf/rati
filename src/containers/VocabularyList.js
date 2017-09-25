import React, { Component } from 'react';
import VocabularyListItem from '../components/VocabularyListItem';

class VocabularyList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.vocabularies.map((vocabulary, i) => {
            return (
              <VocabularyListItem key={i} value={vocabulary} />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default VocabularyList;