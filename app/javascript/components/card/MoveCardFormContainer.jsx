import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

import MoveCardForm from './MoveCardForm';

import * as actions from '../../actions/CardActions';

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
    location: {
      boardId: undefined,
      listId: undefined,
      position: undefined
    }
  };

  handleLocationChange = (location) => {
    this.setState({ location });
  };

  handleSubmit = (e) => {
    if (this.isSubmitDisabled()) { return; }

    e.preventDefault;

    const store = this.context.store;
    const { boardId, listId, position } = this.state.location;
    const sourceBoardId = this.props.card.board_id;
    const changingBoard = boardId !== sourceBoardId;

    store.dispatch(
      actions.updateCard(
        this.props.card.id, {
          list_id: listId,
          position: position
        }, () => {
          if (changingBoard) {
            this.props.history.push(`/boards/${sourceBoardId}`);
          } else {
            this.props.onClose(new Event("click"));
          }
        }
      )
    )
  };

  isSubmitDisabled = () => {
    const { boardId, listId, position } = this.state.location;

    return boardId == null || listId == null || position == null;
  };

  render() {
    return (
      <MoveCardForm
        card={this.props.card}
        onCloseClick={this.props.onClose}
        onLocationChange={this.handleLocationChange}
        onSubmit={this.handleSubmit}
        isSubmitDisabled={this.isSubmitDisabled()}
      />
    );
  }
}

export default withRouter(MoveCardFormContainer);
