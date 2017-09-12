import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Board from './Board';

class BoardContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    console.log(this);
    this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getBoard() {
    const { boards } = this.context.store.getState();
    const boardId = Number(this.props.match.params.boardId);

    return boards.find(board => board.id === boardId);
  }

  render() {
    const board = this.getBoard();

    if (board) {
      return (
        <Board board={board} />
      );
    } else {
      return (
        <Redirect to="/" />
      );
    }
  }
};

export default BoardContainer;
