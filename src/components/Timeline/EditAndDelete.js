import styled from 'styled-components';
import axios from 'axios';
import pencil from './images/pencil.png'
import trash from './images/trash.png'
import UserContext from '../UserContext';
import {useContext, useState, useEffect} from 'react';
import Modal from 'react-modal';
import ModalDelete from './ModalDelete'

export default function EditAndDelete ({ post}) {

    const { user } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);


    if (post.user.id !== user.user.id) { //garante que so vai aparecer a caixinha se o post for usuario logado
        return null;
    } 

    
    function edit () {
        console.log('clicou no edit')
    }
    
    const config = {
        headers:{
            'Authorization' : `Bearer ${user.token}`
        }
    }

    function updateDescription () {

        const body = {
            "text": ''
        }
       
        const promise = axios.post('url', body, config).then().catch()
    }
 
    function wishDelete () {
        console.log('clicou no delete!')
    }
    function actuallyDelete () {
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
   

    return (
        <> 
    {/* //    <BG> */}
           <Container>
               <Pencil 
               onClick={edit}
               src={pencil}/>
               <Trash
               onClick={()=>{
                wishDelete()
               }}
               src={trash}/>
           </Container>
    {/* //    </BG> */}
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

const Pencil = styled.img`

`;
const Trash = styled.img`

`;