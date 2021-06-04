import styled from 'styled-components';
import axios from 'axios';
import { useState, useContext } from 'react';
import UserContext from '../UserContext';
import { LocationOutline } from 'react-ionicons'

export default function NewPost ({update}) {
  const [linkToPost, setLinkToPost] = useState('');
  const [linkDescription, setLinkDescription] = useState('');
  const [disabled, letDisabled] = useState(false);
  const [buttonText, letButtonText] = useState('Publicar');
  const { user ,setUser} = useContext(UserContext);
  
  const [enableLocation, setEnableLocation] = useState({text: 'Localização desativada', textColor: '#949494', enable: false});
  const [cordenates, setCordenates] = useState([null,null])

  function createNewPost (event) {

    event.preventDefault();

    if (linkToPost === '') {
      alert('o link é obrigatório.');
      return;
    }

    const body = {
      "text": linkDescription,
      "link": linkToPost,
      "geolocation": {
        "latitude": cordenates[0],
        "longitude": cordenates[1]
      }
    }

    const config = {
      headers:{
      'Authorization' : `Bearer ${user.token}`
      }
    }
    
    const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', body, config).then((response)=>{
      letDisabled(false);
      letButtonText('Publicar')
      setLinkToPost('');
      setLinkDescription('');
      update();
    }).catch((error)=>{
      alert('houve um erro ao publicar seu link');
      letDisabled(false);
      letButtonText('Publicar')
    })
   
    letDisabled(true);
    letButtonText('Publicando...')
    
  }

  function toggleEnabled () {
    let atualiza;
    if (!enableLocation.enable) {
      atualiza = {text: 'Localização ativada', textColor: '#238700', enable: true}
      if ("geolocation" in navigator) {
        getLocation();
      } else {
        alert('não foi possível obter sua localização')
        atualiza = {text: 'Localização desativada', textColor: '#949494', enable: false}
      }
    } else {
      atualiza = {text: 'Localização desativada', textColor: '#949494', enable: false}
      clearLocation();
    }
    setEnableLocation(atualiza);
  }

  function getLocation () {

    navigator.geolocation.getCurrentPosition((position) => {
      setCordenates([position.coords.latitude, position.coords.longitude])
    });

  }
  function clearLocation () {
    setCordenates([null,null])
  }

  return (
      <Post>
        <Icon>
          <img src={user.user.avatar}/>
        </Icon>
        <Form onSubmit={createNewPost}>
          <p>O que você tem para favoritar hoje?</p>
          <InputLink
          autoFocus={true}
            value={linkToPost} 
            disabled={disabled} 
            type="url" 
            placeholder={"http://..."} 
            onChange={e => setLinkToPost(e.target.value)} 
          />
          <InputDescription
            value={linkDescription}
            disabled={disabled}
            type="text"
            placeholder={"Muito irado esse link falando de #javascript"}
            onChange={e => setLinkDescription(e.target.value)}
          />
          <Button disabled={disabled}>{buttonText}</Button>
        </Form>
        <ShowLocation onClick={toggleEnabled} enableLocation={enableLocation} >
          <LocationOutline
            color={enableLocation.textColor} 
            height="15px"
            width="15px"
          />
          <p>{enableLocation.text}</p>
        </ShowLocation>
      </Post>
  );

}

const ShowLocation = styled.div`
  color: ${(props) => (props.enableLocation.textColor)} ;
  display: flex;
  align-items: center;
  position: absolute;
  left: 90px;
  bottom: 24px;
  p {
    margin: 0 0 0 3px;
    font-size: 13px;
  }
`;

const Post = styled.div`
  background-color: white;
  width: 611px;
  height: 209px;
  border-radius: 16px;
  display: flex;
  padding-right: 22px;
  padding-bottom: 16px;
  font-family: Lato;
  position: relative;
  

  @media (max-width:1200px){
    margin: 0 auto;
    width: calc(690px - 8%);
    min-width:360px;
  }
  

  @media (max-width:610px){
    width: 100%!important;
    border-radius: 0;
  }
`;

const Form = styled.form`
  width: 503px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width:610px){
    width: 100%;
  }

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
  border-radius: 25px;
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
    

