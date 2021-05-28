import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import {useContext, useState, useEffect} from 'react';
import UserContext from '../UserContext';

export default function DeleteModal ({modalIsOpen, toggleModal, update, id}) {

    const { user } = useContext(UserContext);
    
    const config = {
        headers:{
            'Authorization' : `Bearer ${user.token}`
        }
    }

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          zIndex                : '15'
        }
    };

    function DeletePost () {
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}`, config).then((answer)=>{
            console.log('deletou');
            console.log(answer);
            toggleModal();
            update();

        }).catch((error)=>{
            console.log(id)
            toggleModal();


        })
    }

    Modal.setAppElement('.root') 

    return(
            <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            >
                <p>Você tem certeza que deseja apagar essa postagem?</p>
                <button onClick={DeletePost} >Isso. Apaga ela.</button>
                <button onClick={toggleModal} >Não, deixa ela aí!</button>
            </Modal>
    )
}