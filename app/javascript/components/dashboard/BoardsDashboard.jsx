import React from 'react';
import { connect } from 'react-redux';
import BoardsDashboardDisplay from './BoardsDashboardDisplay';
import PropTypes from 'prop-types';

import * as actions from '../../actions/BoardActions';

class BoardsDashboard extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const store = this.context.store;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
    store.dispatch(actions.fetchBoards());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  allBoards = () => {
    const store = this.context.store;
    return store.getState().boards;
  }

  render() {
    return (
      <BoardsDashboardDisplay boards={this.allBoards()} />
    )
  }
}

export default BoardsDashboard;
