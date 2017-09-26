import React from 'react';
import PropTypes from 'prop-types';
import dragula from 'react-dragula';

import * as selectors from '../selectors/ListSelectors';
import * as cardActions from '../actions/CardActions';

import DraggableList from './DraggableList';

class ExistingLists extends React.Component {
  state = {
    lists: [],
    addCardActiveListId: null,
    newCardFormText: ''
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

    const cardDrake = dragula({
      isContainer: function (el) {
        return el.id === 'cards-container';
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      var event = document.createEvent('Event');
      event.initEvent('drop', true, true);

      let options = {
        direction: 'horizontal',
        moves: function (el, source, handle, sibling) {
          return !handle.closest("#cards-container");
        },
        accepts: function (el, target, source, sibling) {
          return !el.closest("#cards-container");
        },
      };

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

  handleAddCardClick = (e, id) => {
    this.setState({
      addCardActiveListId: id
    });
  };

  handleNewCardFormChange = (e) => {
    this.setState({
      newCardFormText: e.target.value
    });
  };

  handleNewCardFormKeyPress = (e) => {
    const store = this.context.store;

    if (e.key === 'Enter') {
      e.preventDefault();

      store.dispatch(cardActions.createCard(this.state.addCardActiveListId, {
        title: this.state.newCardFormText
      }, this.setState({ newCardFormText: '' })));
    }
  };

  handleNewCardFormSubmit = (e) => {
    const store = this.context.store;

    e.preventDefault();
    store.dispatch(cardActions.createCard(this.state.addCardActiveListId, {
      title: this.state.newCardFormText
    }, this.handleNewCardFormClose));
  };

  handleNewCardFormClose = () => {
    this.setState({
      addCardActiveListId: null,
      newCardFormText: ''
    });
  };

  render() {
    return (
      <div 
        id="existing-lists"
        className="existing-lists"
        ref={this.dragulaDecorator}
      >
        {
          this.sortedLists().map(list => (
            <DraggableList
              key={list.id}
              list={list}
              onAddCardClick={this.handleAddCardClick}
              addCardActive={this.state.addCardActiveListId === list.id}
              onNewCardFormChange={this.handleNewCardFormChange}
              onNewCardFormClose={this.handleNewCardFormClose}
              onNewCardFormSubmit={this.handleNewCardFormSubmit}
              onNewCardFormKeyPress={this.handleNewCardFormKeyPress}
              newCardFormText={this.state.newCardFormText}
            />
          ))
        }
      </div>
    );
  }
}

export default ExistingLists;
