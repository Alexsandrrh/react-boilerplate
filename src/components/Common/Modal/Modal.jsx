import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.scss';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  closeModalWindow(e) {
    e.preventDefault();
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }
  }

  render() {
    const { isOpen, className, children } = this.props;

    const modalComponent = (
      <div className={`modal - ${className}`}>
        <div className='modal__background' onClick={e => this.closeModalWindow(e)} />
        <div className='modal__body'>{children}</div>
      </div>
    );

    const componentPortal = isOpen ? modalComponent : null;

    return createPortal(componentPortal, document.getElementById('modal'));
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
