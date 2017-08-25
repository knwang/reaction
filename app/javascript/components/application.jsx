import React from 'react';
import Hello from './hello';

module.exports = class Application extends React.Component {
  render() {
    return <Hello name="React" />;
  }
};

