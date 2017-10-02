import React from 'react';
import $ from 'jquery';
import debounce from 'debounce';

class Popover extends React.Component {
  state = {
    top: 0,
    left: 0
  };

  componentDidMount() {
    this.debounceSetLocation = debounce(this.setLocation, 200);

    if (this.props.visible) {
      this.setLocation();
      this.addSizeBindings();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible && !this.props.visible) {
      this.removeSizeBindings();
    } else if (!prevProps.visible && this.props.visible) {
      this.setLocation();
      this.addSizeBindings();
    } else if (this.props.visible && prevProps.attachedTo !== this.props.attachedTo) {
      this.setLocation();
    }
  }

  componentWillUnmount() {
    this.removeSizeBindings();
  }

  setLocation = () => {
    const $attachedTo = $(this.props.attachedTo);
    const targetLocation = $attachedTo.offset();
    const attachedHeight = $attachedTo.outerHeight();
    const elWidth = $(this.refs.popover).outerWidth(true);
    const windowWidth = $(window).width();
    const overBounds = (elWidth + targetLocation.left) - windowWidth;

    if (overBounds > 0) {
      targetLocation.left -= overBounds;
      targetLocation.left -= 20;
    }

    targetLocation.top += attachedHeight + 3;

    this.setState(targetLocation);
  }

  addSizeBindings = () => {
    window.addEventListener('resize', this.debounceSetLocation);
  };

  removeSizeBindings = () => {
    window.removeEventListener('resize', this.debounceSetLocation);
    this.debounceSetLocation.clear();
  };

  render() {
    if (this.props.visible) {
      return (
        <div 
          ref="popover"
          className={`popover ${this.props.type}`}
          style={{top: this.state.top, left: this.state.left}}
        >
          {this.props.children}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Popover;
