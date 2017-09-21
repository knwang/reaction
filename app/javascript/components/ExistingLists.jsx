import React from 'react';
import PropTypes from 'prop-types';
import dragula from 'react-dragula';

import * as selectors from '../selectors/ListSelectors';

import DraggableList from './DraggableList';

class ExistingLists extends React.Component {
  state = {
    lists: []
  };

  static propTypes = {
    boardId: PropTypes.number.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  updateLists = () => {
    this.setState({
      lists: this.getLists(),
    });
  };

  componentDidMount() {
    const store = this.context.store;

    this.unsubscribe = store.subscribe(() => this.updateLists());
    this.updateLists();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      var event = document.createEvent('Event');
      event.initEvent('drop', true, true);

      let options = { direction: 'horizontal' };
      dragula([componentBackingInstance], options)
        .on('drop', function (el) {
          el.dispatchEvent(event);
        });
    }
  };

  getLists = () => {
    const store = this.context.store;
    return selectors.boardListsSelector(store.getState(), this.props.boardId);
  }

  sortedLists = () => {
    const listCopy = this.state.lists.slice();
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
            <DraggableList key={list.id} list={list} />
          ))
        }
      </div>
    );
  }
}

export default ExistingLists;
