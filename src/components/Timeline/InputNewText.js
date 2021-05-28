import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function InputNewText ({post, update, config, tryingToEdit, toEdit, id}) {

    const [newValue, setNewValue] = useState('');

    useEffect(()=>{
        if (toEdit){
        const nomeQualquer = (event)=> {
            if (event.keyCode===13){
                textToServer(newValue);
            }
        }
        window.addEventListener("keydown", nomeQualquer);
        return() => {
            window.removeEventListener('keydown', nomeQualquer);
        }
    }
    },[toEdit,newValue])

    function textToServer (text) {
        
        const body = {
            "text": text
        }
        

        const promise = axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}`, body, config).then((success)=>{
            tryingToEdit(id);
            update();
        }).catch((error)=>{
            alert('não foi possível salvar as alterações')

        })
    }
    
    return ( 
        <InputField onChange={(e)=>{
            setNewValue(e.target.value);
        }} readOnly={!post.toEdit} open={post.toEdit} >
            {post.text}
        </InputField>
        
    )

}

const InputField = styled.textarea`
    display: ${(props) => (props.open) ? 'initial' : 'none'};
    width: 502px;
    height: auto;
    resize: none;
    border-radius: 7px;
    background-color: white;
    padding: 5px;
    font-family: Lato;
    font-weight: 400;
    color: #4c4c4c;
    font-size: 14px;   
  
`