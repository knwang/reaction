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

  sortedLists = () => {
    const listCopy = this.props.lists.slice();
    return listCopy.sort((a, b) => a.position - b.position);
  }

  render() {
    return (
      <div 
        id="existing-lists"
        className="existing-lists"
        ref={this.dragulaDecorator}
      >
        {
          this.sortedLists().map(list => (
            <List key={list.id} list={list} />
          ))
        }
      </div>
    );
  }
}

export default ExistingLists;
