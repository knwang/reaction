import React from 'react';
import PropTypes from 'prop-types';

import MoveCardForm from './MoveCardForm';

import * as listSelectors from '../../selectors/ListSelectors';
import * as cardSelectors from '../../selectors/CardSelectors';
import calculatePosition from '../../lib/PositionCalculator';

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
        if (newLists.length) {
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
      const cards = cardSelectors.listCards(state, list.id);
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
          cards[i].id === this.props.card.id
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
      this.selectPosition();
    });
  }

  selectPosition = (position) => {
    if (position) {
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
    const pos = this.state.positions.findIndex(pos => pos === this.state.selectedPosition) + 1;
    
    return pos === 0 ? "N/A" : pos;
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

export default MoveCardFormContainer;
