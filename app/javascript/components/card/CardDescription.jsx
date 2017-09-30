import React from 'react';
import showdown from 'showdown';

const converter = new showdown.Converter();
converter.setFlavor('github');

const CardDescription = (props) => (
  <form className="description">
    <p>Description</p>
    {
      props.showForm ? null : (
        <span 
          id="description-edit"
          className="link"
          onClick={props.onEditClick}
        >Edit</span>
      )
    }
    {
      props.showForm ? (
        <div>
          <textarea
            className="textarea-toggle"
            rows="1"
            value={props.description}
            autoFocus={true}
            onBlur={props.onInputBlur}
            onChange={props.onChange}
          ></textarea>
          <div>
            <div
              className="button"
              value="Save"
              onMouseDown={props.onSaveClick}
            >Save</div>
            <i className="x-icon icon"></i>
          </div>
        </div>
      ) : (
        <p className="textarea-overlay" dangerouslySetInnerHTML={{__html: converter.makeHtml(props.description)}}></p>
      )
    }
    {
      props.edited && !props.showForm ? (
        <p id="description-edit-options">
          You have unsaved edits on this field. <span
            className="link"
            onClick={props.onEditClick}
          >View edits</span> - <span
            className="link"
            onClick={props.onDiscardChangeClick}
          >Discard</span>
        </p>
      ) : null
    }
  </form>
);

export default CardDescription;
