import React from 'react';

import CardDescription from './CardDescription';

import * as actions from '../../actions/CardActions';
import PropTypes from 'prop-types';

class EditableCardDescription extends React.Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };

  static contextTypes =  {
    store: PropTypes.object
  };

  state = {
    description: '',
    showForm: false,
  };

  componentWillMount() {
    this.setState({
      description: this.props.description
    });
  }

  toggleForm = (e, visible) => {
    e.preventDefault();

    this.setState({
      showForm: visible
    })
  };

  handleBlur = (e) => {
    this.setState({
      showForm: false
    });
  };

  handleChange = (e) => {
    this.setState({
      description: e.target.value
    });
  };

  handleDiscardChangeClick = (e) => {
    this.setState({
      description: this.props.description
    });
  };

  handleSaveClick = (e) => {
    const dispatch = this.context.store.dispatch;

    dispatch(
      actions.updateCard(this.props.id, {
        description: this.state.description
      }), (updatedCard) => {
        this.setState({
          description: updatedCard.description
        });
      }
    );
  };

  render() {
    return (
      <CardDescription
        description={this.state.description}
        onEditClick={(e) => this.toggleForm(e, true)}
        onInputBlur={this.handleBlur}
        onChange={this.handleChange}
        onDiscardChangeClick={this.handleDiscardChangeClick}
        onSaveClick={this.handleSaveClick}
        showForm={this.state.showForm}
        edited={this.props.description !== this.state.description}
      />
    );
  }
}

export default EditableCardDescription;
