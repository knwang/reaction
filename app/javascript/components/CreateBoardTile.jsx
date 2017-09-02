import React from 'react';
import PropTypes from 'prop-types';

const CreateBoardTile = (props) => (
  <a 
    className="new-board"
    onClick={props.onClick}
  >
    <span className="board-title">Create a new board...</span>
  </a>
);

export default CreateBoardTile;
