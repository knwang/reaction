import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as formActions from '../actions/FormActions';
import * as listActions from '../actions/ListActions';
import * as listSelectors from '../selectors/ListSelectors';
import positionCalculator from '../lib/PositionCalculator';

import CreateListTile from './CreateListTile';

class CreateListTileContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object,
    currentBoardId: PropTypes.number
  };

  handleTileClick = (e) => {
    e.stopPropagation();
    this.context.store.dispatch(formActions.showCreateListForm());
  };

  handleCloseClick = (e) => {
    e.stopPropagation();
    this.context.store.dispatch(formActions.hideCreateListForm());
  };

  handleChange = (e) => {
    this.context.store.dispatch(formActions.updateCreateListFormInputText(e.target.value))
  };

  handleSubmit = (e) => {
    e.preventDefault;

    const currentState = this.getState()
    const lists = listSelectors.boardListsSelector(
      currentState, this.context.currentBoardId
    );
    const position = positionCalculator(lists, lists.length + 1);

    this.context.store.dispatch(
      listActions.createList(
        this.context.currentBoardId,
        {
          title: currentState.newListForm.title,
          position
        }
      )
    );
  };

  getState = () => {
    return this.context.store.getState();
  };

  render() {
    return (
      <CreateListTile
        showForm={this.getState().newListForm.display}
        title={this.getState().newListForm.title}
        onTileClick={this.handleTileClick}
        onCloseClick={this.handleCloseClick}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />
    );
  };
}

export default CreateListTileContainer;
