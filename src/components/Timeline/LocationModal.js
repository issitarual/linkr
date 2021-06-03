import styled from 'styled-components'
import Modal from 'react-modal';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { CloseOutline } from 'react-ionicons'


export default function LocationModal ({ loc, username, locationIsOpen, setLocationIsOpen }) {

    Modal.setAppElement('.root') 

    function closeMap () {
        setLocationIsOpen(false);
    }

    return (

        <Modal
            isOpen={locationIsOpen}
            aria-labelledby="Google Maps"
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
                    width: '790px',
                    height: '354px',
                    padding: '15px 35px 21px 30px',
                    marginTop: 'calc((100vh - 354px) / 2 - 50px )',
                    marginBottom: 'calc((100vh - 354px) / 2 + 50px)',
                    marginRight: 'calc((100vw - 790px) / 2 + 50px)',
                    marginLeft: 'calc((100vw - 790px) / 2 - 50px)'
                }
            }}
        >
            

            <DisplayFlex>
                <User>{`${username}'s location`}</User>
                <CloseButton onClick={closeMap} >
                    <CloseOutline
                        color={'#ffffff'} 
                        height="35px"
                        width="35px"
                    />
                </CloseButton>
            </DisplayFlex>

            <Map>
            {console.log(loc)}
                <GoogleMapReact 
                    bootstrapURLKeys={{
                        key: 'AIzaSyBcxyx-xIbCFp88e_tiMPKwTYHAL4438og', 
                        language: 'pt-br'
                    }}
                    center={loc}
                    defaultZoom={8}
                ></GoogleMapReact>

            </Map>           

        </Modal>      
    )
}

const Map = styled.div`
    width: 713px;
    height: 240px;
    z-index: 8;
    margin: 10px 0 0 0;
`;
const DisplayFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;
const CloseButton = styled.button`
    font-size: 40px;
    background-color: rgba(0,0,0,0);
    color: white;
    font-family: Lato;
    height: auto;
`;
const User = styled.div`
    font-family: Oswald;
    font-size: 38px;
    color: #ffffff;
    font-weight: 700;
`;