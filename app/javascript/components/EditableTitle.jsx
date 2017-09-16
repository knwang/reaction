import React from 'react';
import PropTypes from 'prop-types';

const EditableTitle = props => (
  <div>
      <input 
        type="text" 
        className={props.childClassName}
        value={props.title}
        onBlur={props.onBlur}
        onKeyPress={props.onKeyPress}
        onChange={props.onChange}
      />
  </div>
);

EditableTitle.propTypes = {
  onBlur: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default EditableTitle;
