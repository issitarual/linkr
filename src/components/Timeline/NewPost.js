import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';

export default function NewPost ({config}) {

  const [linkToPost, setLinkToPost] = useState('')
  const [linkDescription, setLinkDescription] = useState('')
  const [disabled, letDisabled] = useState(false)
  const [buttonText, letButtonText] = useState('Publicar')

  function createNewPost (event) {

    event.preventDefault();

    if (linkToPost === '') {
      alert('o link é obrigatório.');
      return;
    }

    const body = {
      "text": linkDescription,
      "link": linkToPost
    }
    
    const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', body, config).then((response)=>{
      letDisabled(false);
      letButtonText('Publicar')
      setLinkToPost('');
      setLinkDescription('');
    }).catch((error)=>{
      alert('houve um erro ao publicar seu link');
      letDisabled(false);
      letButtonText('Publicar')
    })
   
    letDisabled(true);
    letButtonText('Publicando...')
    
  }

  return (
    <Corpo>
      <Post>
        <Icon>
          <img src={''}/>
        </Icon>
        <Form onSubmit={createNewPost}>
          <p>O que você tem para favoritar hoje?</p>
          <InputLink 
            disabled={disabled} 
            type="url" 
            placeholder={"http://..."} 
            onChange={e => setLinkToPost(e.target.value)} 
          />
          <InputDescription 
            disabled={disabled}
            type="text"
            placeholder={"Muito irado esse link falando de #javascript"}
            onChange={e => setLinkDescription(e.target.value)}
          />
          <Button disabled={disabled}>{buttonText}</Button>
        </Form>
      </Post>
    </Corpo>
  );

}

//quando for para a timeline esse estilo 'Corpo' vai sumir
const Corpo = styled.div`
  background-color: #333333;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Lato;
`;

const Post = styled.div`
  background-color: white;
  width: 611px;
  height: 209px;
  border-radius: 16px;
  display: flex;
  padding-right: 22px;
  padding-bottom: 16px;
`;

const Form = styled.form`
  width: 503px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  p {
    color: #707070;
    font-size: 20px;
    margin-top: 21px;
    margin-bottom: 16px;
    width: 100%;
  }

  textarea {
    width: 100%;
    margin-bottom: 5px;
    margin-top: 0px;
    background-color: #efefef;
    border: none;
    border-radius: 5px;
    padding-left: 12px;
    padding-top: 8px;
    resize: none;
    ::placeholder {
      color: #949494;
      font-size: 15px;
    }
  }
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #333333;
  border-radius: 30px;
  margin-top: 16px;
  margin-left: 18px;
  margin-right: 18px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 30px;
  }
`;

const InputLink = styled.textarea`
  height: 30px;
`;

const InputDescription = styled.textarea`
  height: 66px;
  margin-top: 8px;
`;

const Button = styled.button`
  width: 112px;
  height: 31px;
  right: -16px;
  border: none;
  background-color: #1877f2;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  &:disabled {
    background-color: grey;
    color: lightgrey;
  }
`;
    
