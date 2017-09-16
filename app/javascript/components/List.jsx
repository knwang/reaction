import React from 'react';
import PropTypes from 'prop-types';

import EditableListTitle from './EditableListTitle';
import CardListing from './CardListing';

const List = props => (
  <div className="list-wrapper">
      <div className="list-background">
          <div className="list">
              <a className="more-icon sm-icon" href=""></a>
              <EditableListTitle list={props.list} />
              <div className="add-dropdown add-top">
                  <div className="card"></div><a className="button">Add</a><i className="x-icon icon"></i>
                  <div className="add-options"><span>...</span>
                  </div>
              </div>
              <CardListing cards={[]} />
              <div className="add-dropdown add-bottom">
                  <div className="card"></div><a className="button">Add</a><i className="x-icon icon"></i>
                  <div className="add-options"><span>...</span>
                  </div>
              </div>
              <div className="add-card-toggle" data-position="bottom">Add a card...</div>
          </div>
      </div>
  </div>
);

List.propTypes = {
  list: PropTypes.object.isRequired,
};

export default List;
