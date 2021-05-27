import react from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';


function ModalDelete ({isOpen}) {
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Modal"
       >
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
        </form>
      </Modal>
    )
    )
}

