import React from 'react';
import { Route } from 'react-router-dom';

import TopNav from './TopNav';
import BoardsDashboard from './BoardsDashboard';

const Application = () => (
  <div>
    <TopNav />

    <Route path='/' exact component={BoardsDashboard} />
  </div>
);

export default Application;
