import styled from 'styled-components'
import React from 'react';
import Modal from 'react-modal';
import { CloseOutline } from 'react-ionicons'

export default function LinkPreview ({ link, linkIsOpen, setLinkIsOpen }) {

    Modal.setAppElement('.root') 

    function closePreview () {
        setLinkIsOpen(false);
    }

    function openInNewTab () {
        window.open(link);
        setLinkIsOpen(false);
    }

    return (

        <Modal
            isOpen={linkIsOpen}
            aria-labelledby="modal-title"
            style={{
                overlay: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                  width: '100%',
                  height: '100vh',
                  zIndex: '3'
                },
                
                content: {
                    background: '#333333',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '20px',
                    width: '70vw',
                    height: '85vh',
                    paddingRight: '16px',
                    paddingLeft: '30px',
                    paddingTop: '15px',
                    paddindBottom: '21px',
                    marginTop: '5vh',
                    marginBottom: '10vh',
                    marginRight: '18vw',
                    marginLeft: '12vw'
                }
            }}
        >
            <DisplayFlex>
                <NewTabButton onClick={openInNewTab} >Open in new tab</NewTabButton>
                <CloseButton onClick={closePreview} >
                    <CloseOutline
                        color={'#ffffff'} 
                        height="40px"
                        width="40px"
                    />
                </CloseButton>
            </DisplayFlex>

            <Iframe src={link} />

        </Modal>      
    )
}

const Iframe = styled.iframe`
    width: calc(100% - 10px);
    height: calc(100% - 50px);
`;

const NewTabButton = styled.button`
    width: 138px;
    height: 31px;
    background-color: #1877F2;
    border-radius: 5px;
    color: white;
    font-family: Lato;
    font-size: 14px;
`;

const CloseButton = styled.button`
    font-size: 40px;
    background-color: rgba(0,0,0,0);
    color: white;
    font-family: Lato;
    height: auto;
`;

const DisplayFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

