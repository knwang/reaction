import React from 'react';

import ExistingLists from './ExistingLists';
import CreateListTileContainer from './CreateListTileContainer';

const ListListing = props => (
  <div id="list-container" className="list-container">
    <ExistingLists boardId={props.boardId} />
    <CreateListTileContainer />
  </div>
);

export default ListListing;
