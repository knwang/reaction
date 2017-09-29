import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import TopNav from './shared/TopNav';
import BoardsDashboard from './dashboard/BoardsDashboard';
import BoardContainer from './board/BoardContainer';
import CardContainer from './card/CardContainer';

import { fetchBoards } from '../actions/BoardActions';

class Application extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }
  render() {
    return (
      <div>
        <TopNav />

        <Route path='/cards/:cardId' exact component={BoardContainer} />
        <Route path='/cards/:cardId' exact component={CardContainer} />
        <Route path='/boards/:boardId' exact component={BoardContainer} />

        <Route path='/' exact component={BoardsDashboard} />
      </div>
    );
  }
}

export default Application;
