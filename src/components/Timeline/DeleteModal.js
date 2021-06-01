import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import {useContext} from 'react';
import UserContext from '../UserContext';

export default function DeleteModal ({modalIsOpen, toggleModal, update, id}) {

    const { user } = useContext(UserContext);
    
    const config = {
        headers:{
            'Authorization' : `Bearer ${user.token}`
        }
    }

    function DeletePost () {
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}`, config).then((answer)=>{

            toggleModal();
            update();

        }).catch((error)=>{
            toggleModal();
            alert("Não foi possível excluir seu post, tente novamente!")


        })
    }

    Modal.setAppElement('.root') 

    return(
            <Modal
            isOpen={modalIsOpen}
            aria-labelledby="modal-title"
            className="mobileModal"
            style={{
                overlay: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                 bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)'
                }
                
              }}
            >
                    <p 
                    style={{
                        color: '#fff',
                        fontSize: '34px',
                        textAlign: 'center',
                        fontFamily: 'Lato',
                    }}
                    id="modal-title">
                        Tem certeza que deseja exluir essa postagem?
                    </p>
                    <div>
                    <button
                    style={{
                        backgroundColor: '#fff',
                        width: '134px',
                        height: '37px',
                        color: '#1877F2',
                        borderRadius: '5px',
                        marginRight: '30px',
                        fontSize: '18px',
                        fontFamily: 'Lato'   

                    }}
                    onClick={toggleModal} >Não, voltar</button>
                    <button 
                        style={{
                            backgroundColor: '#1877F2',
                            width: '134px',
                            height: '37px',
                            color: '#fff',
                            borderRadius: '5px',
                            fontSize: '18px',
                            fontFamily: 'Lato'                    
                        }}
                    onClick={DeletePost} >Sim, excluir</button>
                    </div>
                    
            </Modal>
    )
}

