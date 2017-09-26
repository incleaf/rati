import React, { Component } from 'react';
import VocabularyListItem from '../components/VocabularyListItem';

import './VocabularyList.css';

class VocabularyList extends Component {
  render() {
    const { vocabularies, achieveVocabulary, undoAchieveVocabulary } = this.props;
    const now = Date.now();

    return (
      <div>
        <ul className="vocablist">
          {vocabularies.length
            ? vocabularies.map((vocabulary) => {
              return (
                <VocabularyListItem
                  key={vocabulary._key}
                  value={`${vocabulary.value}${vocabulary.memorizationLevel}`}
                  handleAchieveButtonClick={() => achieveVocabulary(vocabulary)}
                  handleUndoButtonClick={() => undoAchieveVocabulary(vocabulary)}
                  isAchieved={vocabulary.displayAt > now}
                />
              );
            })
            : <p className="vocablist__blankslate">Vocabulary is empty. <i>Why don't you add something?</i></p>
          }
        </ul>
      </div>
    );
  }
}

export default VocabularyList;