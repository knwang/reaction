import React from 'react';
import PropTypes from 'prop-types';
import dragula from 'react-dragula';

import List from './List';

class ExistingLists extends React.Component {
  static propTypes = {
    lists: PropTypes.array.isRequired
  };

  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = { direction: 'horizontal' };
      dragula([componentBackingInstance], options);
    }
  };

  render() {
    return (
      <div 
        id="existing-lists"
        className="existing-lists"
        ref={this.dragulaDecorator}
      >
        {
          this.props.lists.map(list => (
            <List key={list.id} list={list} />
          ))
        }
      </div>
    );
  }
}

export default ExistingLists;
