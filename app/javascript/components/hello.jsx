import React from 'react';
import PropTypes from 'prop-types';

module.exports = class Hello extends React.Component {
  static propTypes = {
    name: PropTypes.string
  }

  defaultProps() {
    return {
      name: "Elle",
    };
  }

  render() {
    return <div>Hello {this.props.name}!</div>
  }
};
