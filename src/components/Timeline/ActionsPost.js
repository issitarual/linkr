import styled from 'styled-components';
import axios from 'axios';
import UserContext from '../UserContext';
import {useContext, useState, useEffect} from 'react';
import { TrashOutline, CreateOutline } from 'react-ionicons'


export default function ActionsPost ({tryingToEdit, post, id}) {

    const { user } = useContext(UserContext);
 

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
       
        const promise = axios.post('url', body, config).then().catch(()=>{
            alert('não foi possível salvar as alterações')
        })
    }
    //--------------------------final do edit------------------//

    //--------------------------inicio do delete------------------//

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

    //--------------------------final do delete------------------//
  

    return (
           <Container>
              <button onClick={() => {
                  tryingToEdit(id);
              }}>edita</button>
               
              <button>apaga</button>
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
