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
                  value={`${vocabulary.value}`}
                  isAchieved={vocabulary.displayAt > now}
                  handleButtonClick={() => {
                    if (vocabulary.displayAt > now) {
                      undoAchieveVocabulary(vocabulary)
                    } else {
                      achieveVocabulary(vocabulary)
                    }
                  }}
                />
              );
            })
            : <p className="vocablist__blankslate">List is empty. <i>Why don't you add something?</i></p>
          }
        </ul>
      </div>
    );
  }
}

export default VocabularyList;