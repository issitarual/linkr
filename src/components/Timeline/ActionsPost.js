import styled from 'styled-components';
import UserContext from '../UserContext';
import {useContext, useState } from 'react';
import DeleteModal from './DeleteModal';
import pencil from './images/pencil.png';
import trash from './images/trash.png';


export default function ActionsPost ({tryingToEdit, toggleModal, update, post, id}) {

    const { user } = useContext(UserContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    if (post.user.id !== user.user.id) { 
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
            }}><img src={pencil}/></button>
            
            <button onClick={toggleModal} ><img src={trash}/></button>
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
    button{
        background-color:#171717;
        margin-top: 20px;
    }
`;
