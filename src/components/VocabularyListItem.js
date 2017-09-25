import React from 'react';

const VocabularyListItem = ({ id, value }) => {
  return (
    <div>
      <a
        href={`http://m.endic.naver.com/search.nhn?searchOption=all&query=${value}`}
        target="_blank"
      >
        {value}
      </a>
    </div>
  );
};

export default VocabularyListItem;