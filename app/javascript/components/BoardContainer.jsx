import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import * as actions from '../actions/BoardActions';
import * as boardSelectors from '../selectors/BoardSelectors';
import * as cardSelectors from '../selectors/CardSelectors';

import * as statuses from '../constants/Statuses';

import Board from './Board';

class BoardContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static childContextTypes = {
    currentBoardId: PropTypes.number
  };

  getChildContext() {
    return {
      currentBoardId: this.getBoardId()
    };
  };

  constructor(props) {
    super(props);
    this.state = { board: null };
  }

  componentDidMount() {
    const store = this.context.store;
    this.unsubscribe = store.subscribe(() => {
      this.updateBoardInState();
    });
    
    // We need to set the board during the initial render.
    this.updateBoardInState();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateBoardInState = () => {
    this.setState({ board: this.getBoard() });
  }

  fetchBoard = () => {
    const store = this.context.store;
    store.dispatch(actions.fetchBoard(this.state.board.id));
  }

  getBoardId = () => {
    if (this.props.match.params.boardId) {
      return Number(this.props.match.params.boardId);
    } else {
      const store = this.context.store;
      const card = cardSelectors.getCardById(
        store.getState(),
        Number(this.props.match.params.cardId)
      );

      if (card) {
        return card.board_id;
      } else {
        return null;
      }
    }
  };

  getBoard = () => {
    const store = this.context.store;
    const boardId = this.getBoardId();

    if (!boardId) { return null; }

    const board = boardSelectors.getBoardById(store.getState(), boardId);

    if (!board && store.getState().status !== statuses.FETCHING_BOARD) {
      store.dispatch(actions.fetchBoard(boardId));
    }

    return board;
  }

  render() {
    return (
      <Board board={this.state.board} />
    );
  }
};

export default BoardContainer;
