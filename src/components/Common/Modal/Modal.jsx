import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={'modal'}>
        <div className='modal__background' />
        <div className='modal__body'>{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
