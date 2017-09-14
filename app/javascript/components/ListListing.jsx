import React from 'react';

import List from './List';
import CreateListTileContainer from './CreateListTileContainer';

const ListListing = props => (
  <div id="list-container" className="list-container">
      <div id="existing-lists" className="existing-lists">
        {
          props.lists.map(list => (
            <List key={list.id} list={list} />
          ))
        }
      </div>
      <CreateListTileContainer />
  </div>
);

export default ListListing;
