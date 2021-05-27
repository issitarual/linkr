import styled from 'styled-components';
import axios from 'axios';
import pencil from './images/pencil.png'
import trash from './images/trash.png'
import UserContext from '../UserContext';
import {useContext, useState, useEffect} from 'react';
import ModalDelete from './ModalDelete';
import { TrashOutline, CreateOutline } from 'react-ionicons'
import Modal from 'react-modal';


export default function EditAndDelete ({post}) {

    const { user } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    function openModal() {
      setIsOpen(true);
    }
    
      function closeModal(){
        setIsOpen(false);
      }
      const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };

    if (post.user.id !== user.user.id) { //garante que so vai aparecer a caixinha se o post for usuario logado
        return null;
    } 
    const config = {
        headers:{
            'Authorization' : `Bearer ${user.token}`
        }
    }
    function edit () {
        console.log('clicou no edit')
    }

//--------------------------inicio do edit------------------//


    function updateDescription () {

        const body = {
            "text": ''
        }
       
        const promise = axios.post('url', body, config).then().catch()
    }
//--------------------------final do edit------------------//

//--------------------------inicio do delete------------------//

    function wishDelete () {
        console.log('clicou no delete!')
    }
    function actuallyDelete () { //funcionando perfeitamente: envia a requisição para o servidor para deletar
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}`, config).then((answer)=>{
            console.log('deletou');
            console.log(answer);
        }).catch((error)=>{
            console.log(post)
            console.log('deu erro');
            console.log(error)
            console.log(user)
            console.log(config)
        })
    }

    function aWildDialogAppears () {
        console.log('clicou no delete')
        return (
            <dialog>
                <form method="dialog">
                    <p>Você tem certeza que deseja apagar essa postagem?</p>
                    <menu>
                    <button onClick={()=>{}} >Isso. Apaga ela.</button>
                    <button onClick={()=>{console.log('nao deleta')}} >Não, deixa ela aí!</button>
                    </menu>
                </form>
            </dialog>
        )
    }
//--------------------------final do delete------------------//
  

    return (
        <> 
           <Container>
               <CreateOutline
                    onClick={openModal}
                    color={'#fff'} 
                    height="25px"
                    width="25px"
                />
                
               <TrashOutline
                onClick={()=>{
                    wishDelete()
                }}
                    color={'#fff'} 
                    height="25px"
                    width="25px"
                />
                        <Modal
                        isOpen={isOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"

                        ></Modal>
           </Container>
        </>
    );
}

// const BG = styled.div`
//     background-color: lightpink;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 100vw;
//     height: 100vh;
//     /* apagar tudo sobre isso */
// `;

const Container = styled.div`
    width: 43px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: lightskyblue; /* apagar depois */
`;
