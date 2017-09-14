import React from 'react';
import { connect } from 'react-redux';

import CreateListTile from './CreateListTile';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps
  };
}

const CreateListTileContainer = connect(
  mapStateToProps, mapDispatchToProps, mergeProps
)(CreateListTile);

export default CreateListTileContainer;
