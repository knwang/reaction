import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import TopNav from './TopNav';
import BoardsDashboard from './BoardsDashboard';
import BoardContainer from './BoardContainer';
import CardContainer from './CardContainer';

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
