import React from 'react';

import './VocabularyListItem.css';

const VocabularyListItem = ({ id, value }) => {
  return (
    <li className="vocablistitem">
      <a
        href={`http://m.endic.naver.com/search.nhn?searchOption=all&query=${value}`}
        target="_blank"
      >
        {value}
      </a>
    </li>
  );
};

export default VocabularyListItem;