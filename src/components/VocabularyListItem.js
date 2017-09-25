import React from 'react';

const VocabularyListItem = ({ id, value }) => {
  return (
    <div>
      <a href={`https://m.endic.naver.com/search.nhn?searchOption=all&query=${value}`}>{value}</a>
    </div>
  );
};

export default VocabularyListItem;