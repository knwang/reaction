import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as cardSelectors from '../selectors/CardSelectors';
import * as boardSelectors from '../selectors/BoardSelectors';

import Card from './Card';

function getCard(state, props) {
  return cardSelectors.getCardById(state, +props.match.params.cardId);
}

function mapStateToProps(state, ownProps) {
  return {
    card: getCard(state, ownProps)
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
