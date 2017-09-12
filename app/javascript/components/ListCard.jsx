import React from 'react';

const ListCard = props => (
  <div className="card-background">
      <div className="card "><i className="edit-toggle edit-icon sm-icon"></i>
          <div className="card-info">
            {
              props.card.labels.map((label, index) => (
                <div 
                  className={`card-label ${label} colorblindable`}
                  key={index}
                ></div>
              ))
            }
            <p>{props.card.title}</p>
          </div>
          <div className="card-icons"><i className="clock-icon sm-icon overdue-recent completed">Aug 4</i><i className="description-icon sm-icon"></i><i className="comment-icon sm-icon"></i>
          </div>
      </div>
  </div>
);

export default ListCard;