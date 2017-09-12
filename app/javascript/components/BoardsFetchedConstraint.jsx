import React from 'react';
import PropTypes from 'prop-types';

import * as statuses from '../constants/Statuses';

const acceptableState = status => {
  if (status !== statuses.FETCHING_BOARDS) {
    return true;
  }
}

class BoardsFetchedConstraint extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  };

  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (acceptableState(this.context.store.getState().status)) {
      return this.props.children;
    } else {
      return null;
    }
  }
};

export default BoardsFetchedConstraint;
