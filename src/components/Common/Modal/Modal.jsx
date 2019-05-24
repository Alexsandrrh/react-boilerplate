import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { isOpen, className } = this.props;

    const modalComponent = (
      <div className={'modal -' + className}>
        <div
          className='modal__background'
          onClick={e => {
            this.closeModalWindow(e);
          }}
        />
        <div className='modal__body'>{this.props.children}</div>
      </div>
    );

    const componentPortal = isOpen ? modalComponent : null;

    return createPortal(componentPortal, document.getElementById('modal'));
  }

  closeModalWindow(e) {
    e.preventDefault();

    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}

export default Modal;
