import React from 'react';

import './VocabularyListItem.css';

const VocabularyListItem = ({ id, value }) => {
  return (
    <li className="vocablistitem">
      <div className="vocablistitem__value">
        <a
          href={`http://m.endic.naver.com/search.nhn?searchOption=all&query=${value}`}
          target="_blank"
        >
          {value}
        </a>
      </div>
      <button className="vocablistitem__btn-achieve">
        Achieve
      </button>
    </li>
  );
};

export default VocabularyListItem;