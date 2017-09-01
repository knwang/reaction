import React from 'react';
import PropTypes from 'prop-types';

const BoardTile = (props) => (
  <li className="board-tile">
    <a>
      <span className="board-title">{props.title}</span>
    </a>
  </li>
);

BoardTile.propTypes = {
  title: PropTypes.string.isRequired
};

export default BoardTile;
