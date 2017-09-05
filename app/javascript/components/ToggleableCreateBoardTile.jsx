import React from 'react';
import PropTypes from 'prop-types';

import CreateBoardTile from './CreateBoardTile';
import CreateBoardTileForm from './CreateBoardTileForm';
import CreateBoardTileFormContainer from './CreateBoardTileFormContainer';

import * as formActions from '../actions/FormActions';

class ToggleableCreateBoardTile extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  };

  componentWillMount() {
   this.context.store.subscribe(() => this.forceUpdate()) ;
  }

  handleTileClick = (e) => {
    e.preventDefault();

    this.context.store.dispatch(formActions.showCreateBoardForm());
  }

  handleFormCloseClick = (e) => {
    e.preventDefault();

    this.context.store.dispatch(formActions.hideCreateBoardForm());
  }

  render() {
    if (this.context.store.getState().newBoardForm.display) {
      return (
        <li className="board-tile">
          <CreateBoardTileFormContainer
            onCloseClick={this.handleFormCloseClick}
          />
        </li>
      );
    } else {
      return (
        <li className="board-tile">
          <CreateBoardTile
            onClick={this.handleTileClick}
          />
        </li>
      );
    }
  }
}

export default ToggleableCreateBoardTile;
