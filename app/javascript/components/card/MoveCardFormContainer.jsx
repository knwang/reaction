import React from 'react';

import MoveCardForm from './MoveCardForm';

class MoveCardFormContainer extends React.Component {
  render() {
    return (
      <MoveCardForm
        onCloseClick={this.props.onClose}
      />
    );
  }
}

export default MoveCardFormContainer;
