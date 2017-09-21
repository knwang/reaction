import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import * as actions from '../actions/BoardActions';
import * as selectors from '../selectors/ListSelectors';

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
      currentBoardId: Number(this.props.match.params.boardId)
    };
  };

  constructor(props) {
    super(props);
    this.state = { board: null };
  }

  componentDidMount() {
    const store = this.context.store;
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        board: this.getBoard(),
      });
    });

    store.dispatch(actions.fetchBoard(Number(this.props.match.params.boardId)));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  boardExists() {
    return !!this.state.board;
  }

  getBoard() {
    const { boards } = this.context.store.getState();
    const boardId = Number(this.props.match.params.boardId);

    return boards.find(board => board.id === boardId);
  }

  render() {
    return (
      <Board board={this.state.board} />
    );
  }
};

export default BoardContainer;
