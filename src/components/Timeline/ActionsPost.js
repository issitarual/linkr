import styled from 'styled-components';
import UserContext from '../UserContext';
import {useContext, useState } from 'react';
import { TrashOutline, CreateOutline } from 'react-ionicons'
import DeleteModal from './DeleteModal';


export default function ActionsPost ({tryingToEdit, toggleModal, update, post, id}) {

    const { user } = useContext(UserContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);


    if (post.user.id !== user.user.id) { //garante que so vai aparecer a caixinha se o post for usuario logado
        return null;
    } 

    const config = {
        headers:{
            'Authorization' : `Bearer ${user.token}`
        }
    }



    function toggleModal () {
        setModalIsOpen(!modalIsOpen);
    }

    return (
           <Container>
              <button onClick={() => {
                  tryingToEdit(id);
              }}>edita</button>
               
              <button onClick={toggleModal} >apaga</button>
              <DeleteModal 
              config={config} 
              modalIsOpen={modalIsOpen} 
              update={update} 
              toggleModal={toggleModal} 
              id={id} />
           </Container>
           
        );
    }

    const Container = styled.div`
        width: 100%;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    `;
