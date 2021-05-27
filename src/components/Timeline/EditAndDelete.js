import styled from 'styled-components';
import axios from 'axios';
import pencil from './images/pencil.png'
import trash from './images/trash.png'
import UserContext from '../UserContext';
import {useContext, useState, useEffect} from 'react';
import Modal from 'react-modal';
import ModalDelete from './ModalDelete';
import { TrashOutline, CreateOutline } from 'react-ionicons'


export default function EditAndDelete ({post}) {

    const { user } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);


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
                    onClick={edit}
                    color={'#00000'} 
                    title={}
                    height="250px"
                    width="250px"
                />
               <TrashOutline
                onClick={()=>{
                    wishDelete()
                }}
                    color={'#00000'} 
                    title={}
                    height="25px"
                    width="25px"
                />
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

const Pencil = styled.img`

`;
const Trash = styled.img`

`;