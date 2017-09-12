import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import TopNav from './TopNav';
import BoardsDashboard from './BoardsDashboard';
import BoardContainer from './BoardContainer';
import BoardsFetchedConstraint from './BoardsFetchedConstraint';

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

        <BoardsFetchedConstraint>
          <Switch>
            <Route path='/boards/:boardId' exact component={BoardContainer} />
          </Switch>
        </BoardsFetchedConstraint>

        <Route path='/' exact component={BoardsDashboard} />
      </div>
    );
  }
}

export default Application;
