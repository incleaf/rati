import React from 'react';

import './VocabularyListItem.css';

const VocabularyListItem = ({ id, value, isAchieved, handleAchieveButtonClick, handleUndoAchieveButtonClick }) => {
  return (
    <li className={`vocablistitem ${isAchieved && 'vocablistitem--achieved'}`}>
      <div className="vocablistitem__value">
        <a
          href={`http://m.endic.naver.com/search.nhn?searchOption=all&query=${value}`}
          target="_blank"
        >
          {value}
        </a>
      </div>
      <button className="vocablistitem__btn-achieve" onClick={isAchieved ? handleUndoAchieveButtonClick : handleAchieveButtonClick}>
        {isAchieved ? 'Undo' : 'Achieve'}
      </button>
    </li>
  );
};

export default VocabularyListItem;