import React, { Component } from 'react';
import { Delete, Edit } from './Icons';

import './VocabularyListItem.css';

class VocabularyListItem extends Component {
  state = {
    newValue: '',
    isEditing: false,
  };

  componentWillMount() {
    this.setState({ newValue: this.props.value });
  }

  handleEditClick = () => {
    this.setState({ isEditing: true });
  };

  handleNewValueChange = e => {
    this.setState({ newValue: e.target.value });
  };

  handleNewValueKeyPress = e => {
    const newValue = this.state.newValue;
    if (e.key === 'Enter' && newValue !== this.props.value) {
      if (newValue.length < 2) {
        alert('Value must be longer than 1 chararcter.');
        return;
      }
      this.props.editVocabulary(newValue);
      this.setState({ isEditing: false });
    }
  }

  render() {
    const {
      id,
      value,
      isAchieved,
      handleAchieveClick,
      handleDeleteClick,
    } = this.props;
    const { isEditing, newValue } = this.state;

    return (
      <li className={`vocablistitem ${isAchieved && 'vocablistitem--achieved'}`}>
        <div className="vocablistitem__value">
          {isEditing
            ? <input
              type="text"
              className="vocablistitem__control"
              value={newValue}
              onChange={this.handleNewValueChange}
              onKeyPress={this.handleNewValueKeyPress}
            />
            : <a
              href={`http://m.endic.naver.com/search.nhn?searchOption=all&query=${value}`}
              target="_blank"
            >
              {value}
            </a>
          }
        </div>
        <div className="vocablistitem__extras">
          <button className="vocablistitem__extra-item" onClick={this.handleEditClick}>
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
  }
}

export default VocabularyListItem;
