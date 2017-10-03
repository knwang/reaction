import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

import MoveCardForm from './MoveCardForm';

import * as listSelectors from '../../selectors/ListSelectors';
import * as cardSelectors from '../../selectors/CardSelectors';
import calculatePosition from '../../lib/PositionCalculator';
import * as actions from '../../actions/CardActions';

import { fetchBoard } from '../../actions/BoardActions';

const sortByTitle = (a, b) => {
  const aTitle = a.title.toLowerCase();
  const bTitle = b.title.toLowerCase();

  if (aTitle < bTitle) return -1;
  if (aTitle > bTitle) return 1;
  return 0;
};

class MoveCardFormContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  };

  state = {
    selectedBoard: undefined,
    selectedList: undefined,
    selectedPosition: undefined,
    boards: [],
    lists: [],
    positions: []
  };

  componentDidMount() {
    const store = this.context.store;
    const state = store.getState();
    const card = this.props.card;
    const boards = state.boards.sort(sortByTitle);
    const lists = listSelectors
      .boardListsSelector(state, this.props.card.board_id)
      .sort(sortByTitle);

    this.setState({
      selectedBoard: boards.find(board => board.id === card.board_id),
      selectedPosition: card.position,
      boards,
      lists
    }, () => {
      this.selectList(this.props.card.list_id);
    });
  };

  handleBoardChange = (e) => {
    const selectedValue = Number(e.target.value);

    this.selectBoard(selectedValue);
  };

  handleListChange = (e) => {
    const selectedValue = Number(e.target.value);

    this.selectList(selectedValue)
  };

  handlePositionChange = (e) => {
    const selectedValue = Number(e.target.value);

    this.selectPosition(selectedValue)
  };

  handleMove = (e) => {
    if (this.isSubmitDisabled()) { return; }

    e.preventDefault;

    const store = this.context.store;
    const sourceBoardId = this.props.card.board_id;
    const changingBoard = this.state.selectedBoard.id !== sourceBoardId;

    store.dispatch(
      actions.updateCard(
        this.props.card.id, {
          list_id: this.state.selectedList.id,
          position: this.state.selectedPosition
        }, () => {
          if (changingBoard) {
            this.props.history.push(`/boards/${sourceBoardId}`);
          } else {
            this.props.onClose(new Event("click"));
          }
        }
      )
    )
  }

  selectBoard = (id) => {
    const store = this.context.store;

    store.dispatch(fetchBoard(id, (board) => {
      const state = store.getState();
      const newLists = listSelectors
        .boardListsSelector(state, id)
        .sort(sortByTitle);

      this.setState({
        selectedBoard: board,
        lists: newLists
      }, () => {
        if (this.state.selectedBoard.id === this.props.card.board_id) {
          this.selectList(this.props.card.list_id);
        } else if (newLists.length) {
          this.selectList(newLists[0].id);
        } else {
          this.selectList();
        }
      });
    }));
  }

  selectList = (id) => {
    let list;
    const positions = [];

    if (id) {
      list = this.state.lists.find(list => list.id === id);
    } else {
      list = this.state.lists[0];
    }

    if (list) {
      const store = this.context.store;
      const state = store.getState();
      const cards = cardSelectors
        .listCards(state, list.id)
        .sort((a, b) => a.position - b.position);
      let currentPosition = cards.findIndex(card => card.id === this.props.card.id);
      if (currentPosition === -1) currentPosition = undefined;

      const potentialPositionsLength =
        currentPosition == undefined ? cards.length + 1 : cards.length;

      for (let i = 0; i < potentialPositionsLength; i++) {
        let position;

        if (
          cards[i] &&
          this.selectedBoardId() === this.props.card.board_id &&
          id === this.props.card.list_id &&
          i === currentPosition
        ) {
          position = this.props.card.position;
        } else {
          position = calculatePosition(cards, i, currentPosition);
        }

        positions.push(position);
      }
    }    

    this.setState({
      selectedList: list,
      positions
    }, () => {
      if (
        this.state.selectedBoard.id === this.props.card.board_id &&
        this.state.selectedList.id === this.props.card.list_id
      ) {
        this.selectPosition(this.props.card.position);
      } else {
        this.selectPosition("bottom");
      }
    });
  }

  selectPosition = (position) => {
    if (position === "bottom") {
      position = this.state.positions[this.state.positions.length - 1];
    }

    if (position != null) {
      this.setState({
        selectedPosition: position
      });
    } else {
      this.setState({
        selectedPosition: this.state.positions[0]
      });
    }
  }

  selectedBoardTitle = () => {
    if (this.state.selectedBoard) {
      return this.state.selectedBoard.title;
    } else {
      return "No Boards";
    }
  }

  selectedBoardId = () => {
    if (this.state.selectedBoard) {
      return this.state.selectedBoard.id;
    } else {
      return undefined;
    }
  }

  selectedListTitle = () => {
    if (this.state.selectedList) {
      return this.state.selectedList.title;
    } else {
      return "No Lists";
    }
  }

  selectedListId = () => {
    if (this.state.selectedList) {
      return this.state.selectedList.id;
    } else {
      return undefined;
    }
  }

  selectedPositionHumanIndex = () => {
    const pos = this.state.positions.findIndex(
      pos => pos === this.state.selectedPosition
    )
    
    if (pos === -1) {
      return "N/A"
     } else {
      return pos + 1;
     }
  }

  isSubmitDisabled = () => {
    return (
      this.state.selectedBoard == null ||
      this.state.selectedList == null ||
      this.state.selectedPosition == null 
    );
  }

  render() {
    return (
      <MoveCardForm
        onCloseClick={this.props.onClose}
        onMove={this.handleMove}
        boards={this.state.boards}
        lists={this.state.lists}
        positions={this.state.positions}
        selectedBoardId={this.selectedBoardId()}
        selectedBoardTitle={this.selectedBoardTitle()}
        selectedListId={this.selectedListId()}
        selectedListTitle={this.selectedListTitle()}
        selectedPosition={this.state.selectedPosition}
        currentBoardId={this.props.card.board_id}
        currentListId={this.props.card.list_id}
        currentPosition={this.props.card.position}
        selectedPositionHumanIndex={this.selectedPositionHumanIndex()}
        onBoardChange={this.handleBoardChange}
        onListChange={this.handleListChange}
        onPositionChange={this.handlePositionChange}
        isSubmitDisabled={this.isSubmitDisabled()}
      />
    );
  }
}

export default withRouter(MoveCardFormContainer);
