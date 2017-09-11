import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import TopNav from './TopNav';
import BoardsDashboard from './BoardsDashboard';

import { fetchBoards } from '../actions/BoardActions';

class Application extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }

  componentWillMount() {
    this.context.store.dispatch(fetchBoards());
  }

  render() {
    return (
      <div>
        <TopNav />

        <Route path='/' exact component={BoardsDashboard} />
      </div>
    );
  }
}

export default Application;
