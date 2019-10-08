import React, { Component } from 'react';
import Modal from './components/Common/Modal/Modal';

class App extends Component {
  render() {
    return (
      <Modal onClose={() => console.log('Modal close')} isOpen={true} className='hello'>
        <p>hello</p>
      </Modal>
    );
  }
}

export default App;
