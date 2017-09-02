import React from 'react';

import CreateBoardTile from './CreateBoardTile';
import CreateBoardTileForm from './CreateBoardTileForm';

class ToggleableCreateBoardTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    };
  }

  handleTileClick = (e) => {
    e.preventDefault();
    
    this.setState({
      showForm: true
    });
  }

  handleFormCloseClick = (e) => {
    e.preventDefault();

    this.setState({
      showForm: false
    });
  }

  render() {
    if (this.state.showForm) {
      return (
        <li className="board-tile">
          <CreateBoardTileForm
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
