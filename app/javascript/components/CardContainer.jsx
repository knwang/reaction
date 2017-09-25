import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as cardSelectors from '../selectors/CardSelectors';
import * as boardSelectors from '../selectors/BoardSelectors';
import * as actions from '../actions/CardActions';

import Card from './Card';

class CardContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const store = this.context.store;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
    store.dispatch(actions.fetchCard(this.getCardId()));
  };

  componentWillUnmount() {
    this.unsubscribe();
  };

  getCardId = () => {
    const cardId = Number(this.props.match.params.cardId);
    return cardId;
  }

  getCard = () => {
    const store = this.context.store;
    return cardSelectors.getCardById(store.getState(), this.getCardId());
  };

  render() {
    return <Card card={this.getCard()} />;
  };
}

export default CardContainer;
