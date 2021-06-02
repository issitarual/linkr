import styled from 'styled-components';
import {useContext, useState, useEffect} from 'react';
import UserContext from './UserContext';
import axios from 'axios';

export default function EachComment ({avatar, username, text, id}){
    const { user } = useContext(UserContext);
    const [followers, setFollowers] = useState([])
    useEffect(()=>{
        const config = {
            headers:{
                'Authorization' : `Bearer ${user.token}`
            }
        }
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows", config)     
        request.then(success => setFollowers(success.data.users))
        request.catch(error => alert(error))
    },[]);
    return(
        <>
            <Container>
                <img src={avatar}/>
                <TextComment>
                    <span>
                        <h5>{username}</h5>
                        <h6>{user.user.id === id? "• post’s author": followers.map(n => n.id).includes(id)? "• following" : null}</h6>
                    </span>                
                    <p>{text}</p>
                </TextComment>
            </Container>
            <Divisor/>
        </>
    )
}


const Container = styled.div`
    height: 68px;
    padding: 0 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`;

const TextComment = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    span{
        margin: 0!important;
        padding: 0!important;
        display: flex;
    }
    h5{
        color: #F3F3F3;
        font-size: 14px;
        font-weight: bold;
        font-family: 'Lato', sans-serif;
    }
    h6{
        color: #565656;
        font-size: 14px;
        font-family: 'Lato', sans-serif;
        margin-left: 5px;
    }
    p{
        color: #ACACAC;
        font-size: 14px;
        font-family: 'Lato', sans-serif;
        margin-top: 5px;
    }
    
`;

const Divisor = styled.div`
    height: 1px;
    width: 90%;
    background-color: #353535;
    margin: auto;
`