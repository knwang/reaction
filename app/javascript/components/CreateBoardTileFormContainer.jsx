import React from 'react';
import { connect } from 'react-redux';

import CreateBoardTileForm from './CreateBoardTileForm';

import { createBoard, updateCreateBoardFormInputText } from '../lib/redux_actions';

const mapStateToProps = function(state) {
  return {
    title: state.newBoardForm.title
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    onCloseClick: ownProps.onCloseClick,
    onTextChange: function(e) {
      dispatch(updateCreateBoardFormInputText(e.target.value));
    },
    dispatch
  };
};

const mergeProps = function(stateProps, dispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    onSubmit: function(e) {
      e.preventDefault();

      const newBoard = { title: stateProps.title };

      dispatchProps.dispatch(createBoard(newBoard));
    }
  };
}

const CreateBoardTileFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CreateBoardTileForm);

export default CreateBoardTileFormContainer;
