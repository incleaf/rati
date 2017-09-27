import React from 'react';
import { Delete, Edit } from './Icons';

import './VocabularyListItem.css';

const VocabularyListItem = props => {
  const { id, value, isAchieved, handleAchieveClick, handleEditClick, handleDeleteClick } = props;
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
      <div className="vocablistitem__extras">
        <button className="vocablistitem__extra-item" onClick={handleEditClick}>
          <Edit />
        </button>
        <button className="vocablistitem__extra-item" onClick={handleDeleteClick}>
          <Delete />
        </button>
      </div>
      <button className="vocablistitem__btn-achieve" onClick={handleAchieveClick}>
        {isAchieved ? 'Undo' : 'Achieve'}
      </button>
    </li>
  );
};

export default VocabularyListItem;