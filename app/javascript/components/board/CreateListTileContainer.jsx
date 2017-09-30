import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as formActions from '../../actions/FormActions';
import * as listActions from '../../actions/ListActions';
import * as listSelectors from '../../selectors/ListSelectors';
import positionCalculator from '../../lib/PositionCalculator';

import CreateListTile from './CreateListTile';

class CreateListTileContainer extends React.Component {
  state = {
    showForm: false,
    title: ''
  };

  static contextTypes = {
    store: PropTypes.object,
    currentBoardId: PropTypes.number
  };

  handleTileClick = (e) => {
    e.stopPropagation();

    this.setState({
      showForm: true
    });
  };

  handleCloseClick = (e) => {
    e.stopPropagation();

    this.setState({
      showForm: false
    });
  };

  handleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault;

    const currentState = this.context.store.getState();
    const lists = listSelectors.boardListsSelector(
      currentState, this.context.currentBoardId
    );
    const position = positionCalculator(lists, lists.length + 1);

    this.context.store.dispatch(
      listActions.createList(
        this.context.currentBoardId, {
          title: this.state.title,
          position
        }, () => {
          this.setState({
            showForm: false,
            title: ''
          });
        }
      )
    );
  };

  render() {
    return (
      <CreateListTile
        showForm={this.state.showForm}
        title={this.state.title}
        onTileClick={this.handleTileClick}
        onCloseClick={this.handleCloseClick}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />
    );
  };
}

export default CreateListTileContainer;
