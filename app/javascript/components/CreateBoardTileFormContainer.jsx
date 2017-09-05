import React from 'react';
import { connect } from 'react-redux';

import CreateBoardTileForm from './CreateBoardTileForm';

import * as boardActions from '../actions/BoardActions';
import * as formActions from '../actions/FormActions';

const mapStateToProps = function(state) {
  return {
    title: state.newBoardForm.title
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    onCloseClick: ownProps.onCloseClick,
    onTextChange: function(e) {
      dispatch(formActions.updateCreateBoardFormInputText(e.target.value));
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

      dispatchProps.dispatch(boardActions.createBoard(newBoard));
    }
  };
}

const CreateBoardTileFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CreateBoardTileForm);

export default CreateBoardTileFormContainer;
