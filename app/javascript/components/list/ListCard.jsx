import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import * as selectors from '../../selectors/CommentSelectors';

class ListCard extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  hasComments = () => {
    return this.props.card.comments_count;
  }

  hasDueDate = () => {
    return !!this.props.card.due_date;
  }

  hasDescription = () => {
    const description = this.props.card.description;

    return description && description.trim().length > 0;
  }

  formattedDueDate = () => {
    const momentDate = moment(this.props.card.due_date);
    let formatString;

    if (momentDate.toDate().getFullYear() === (new Date()).getFullYear()) {
      formatString = 'MMM D';
    } else {
      formatString = 'MMM D, YYYY';
    }

    let formatted = momentDate.format(formatString);

    return `${formatted}`;
  }

  dueClass = () => {
    var diff = (moment(this.props.card.due_date).toDate() - new Date()) / (1000 * 60 * 60 * 24);

    if (this.props.card.completed) {
      return "completed";
    } else if (diff < -1) {
      return "overdue";
    } else if (diff < 0) {
      return "overdue-recent";
    } else if (diff < 1) {
      return "due-soon";
    } else {
      return "";
    }
  };

  render() {
    return (
      <Link 
        to={`/cards/${this.props.card.id}`}
        data-card-id={this.props.card.id}
      >
        <div className="card-background">
            <div className="card "><i className="edit-toggle edit-icon sm-icon"></i>
                <div className="card-info">
                  {
                    this.props.card.labels.map((label, index) => (
                      <div 
                        className={`card-label ${label} colorblindable`}
                        key={index}
                      ></div>
                    ))
                  }
                  <p>{this.props.card.title}</p>
                </div>
                <div className="card-icons">
                  {
                    this.hasDueDate() ? (
                      <i className={`clock-icon sm-icon ${this.dueClass()}`}>
                        {this.formattedDueDate()} 
                      </i>
                    ) : null
                  }
                  {
                    this.hasDescription() ? (
                      <i className="description-icon sm-icon"></i>
                    ) : null
                  }
                  {
                    this.hasComments() ? (
                      <i className="comment-icon sm-icon"></i>
                    ) : null
                  }
                </div>
            </div>
        </div>
      </Link>
    );
  }
}

export default ListCard;
