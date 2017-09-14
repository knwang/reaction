import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import * as actions from '../actions/ListActions';
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
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      board: this.getBoard(),
    });
  }

  componentDidMount() {
    const store = this.context.store;
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        board: this.getBoard(),
      });

      this.forceUpdate()
    });

    if (this.boardExists()) {
      store.dispatch(actions.fetchLists(this.state.board.id));
    }
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

  getLists() {
    const store = this.context.store;
    return selectors.boardListsSelector(store.getState(), this.state.board.id);
  }

  render() {
    if (this.boardExists()) {
      return (
        <Board board={this.state.board} lists={this.getLists()} />
      );
    } else {
      return (
        <Redirect to="/" />
      );
    }
  }
};

export default BoardContainer;
