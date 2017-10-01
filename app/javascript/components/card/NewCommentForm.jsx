import React from 'react';

const NewCommentForm = (props) => (
  <div>
    <h2 className="comment-icon icon">Add Comment</h2>
    <div>
      <div className="member-container">
        <div className="card-member">TP</div>
      </div>
      <div className="comment">
        <label>
          <textarea
            required=""
            rows="1"
            placeholder="Write a comment..."
            onChange={props.onChange}
            value={props.comment}
          ></textarea>
          <div>
            <a className="light-button card-icon sm-icon"></a>
            <a className="light-button smiley-icon sm-icon"></a>
            <a className="light-button email-icon sm-icon"></a>
            <a className="light-button attachment-icon sm-icon"></a>
          </div>
          <div>
            <input
              type="submit" 
              className="button"
              value={props.isSaving ? "Saving..." : "Save"}
              disabled={!props.isEdited}
              onClick={props.onSubmit}
            />
          </div>
        </label>
      </div>
    </div>
  </div>
);

export default NewCommentForm;
