import React from 'react';
import PropTypes from 'prop-types';

const CreateBoardTile = (props) => (
  <li className="board-tile">
    <a className="new-board">
      <span className="board-title">Create a new board...</span>
    </a>
  </li>
);

export default CreateBoardTile;
