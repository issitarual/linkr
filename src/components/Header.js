import styled from 'styled-components';
import { useState, useContext,useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import {DebounceInput} from 'react-debounce-input';

import UserContext from './UserContext';

import { ChevronDownOutline, ChevronUpOutline, SearchOutline, TrainOutline } from 'react-ionicons';

import Users from './Users';

export default function Header (){
    let history = useHistory();
    const [state, setState] = useState(false)
    const { user } = useContext(UserContext);
    const [search, setSearch] = useState("");   
    const [otherUsers, setOtherUsers] = useState([])
    
    return(
        <ContainerHeader state={state}>
            <Link to ="/timeline">
                <h1>linkr</h1>
            </Link>
            <InputGroup>
                <DebounceInput
                    placeholder="Search for people and friends"
                    minLength={3}
                    debounceTimeout={300}
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value)
                        searchUser(e.target.value)
                    }}
                />
                <SearchOutline
                color={'#C6C6C6'} 
                height="25px"
                width="25px"
                />
            </InputGroup>
            <span onClick={() => setState(!state)}>
                {state?
                <ChevronUpOutline
                    color={'#fff'} 
                    height="32px"
                    width="32px"
                />
                :<ChevronDownOutline
                    color={'#fff'} 
                    height="32px"
                    width="32px" 
                /> 
                }
                <img src={user.user.avatar}/>
            </span>
            <Usernames state = {otherUsers.length > 0}>
                {otherUsers.length > 0? otherUsers.map(n => 
                    <Users 
                        avatar = {n.avatar} 
                        username = {n.username} 
                        following = {true} 
                        id = {n.id}
                        userId = {user.user.id}
                    />): null}
            </Usernames>
            <Menu state = {state}>
                    <p onClick={() => link("/my-posts")}>My posts</p>
                    <p onClick={() => link("/my-likes")}>My likes</p>
                    <p onClick={() => link("/")}>Logout</p>
            </Menu>
        </ContainerHeader>
    )

            

    function link (url){
        if(url === "/"){
            localStorage.clear();
        }
        setState(!state);
        history.push(url); 
    }

    function searchUser(username){
        if(username.length < 3) return;
        const config = {
            headers:{
                'Authorization' : `Bearer ${user.token}`
            }
        } 
        const promess = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/search?username=${username}`, config)
        promess.then(success => setOtherUsers(success.data.users));
        promess.catch(error => alert("Ocorreu um erro, tente novamente!"));
    }

}

const ContainerHeader = styled.header`
    position: fixed;
    z-index:2;
    top: 0;
    left: 0;
    width: 100%;
    height: 72px;
    padding: 0px 17px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #151515;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    h1{
        font-family: 'Passion One', cursive;
        font-size: 45px;
        letter-spacing: 5px;
        color: #fff;
    }
    span{
        cursor: pointer;
    }
    img{
        width: 44px;
        height: 44px;
        margin-left: 10px;
        border-radius: 50%;
    }
    p{
        margin: 0;
        margin-bottom: 5px;
        font-family: 'Lato', sans-serif;
        font-size: 17px;
        color: #fff;
        text-align: center;
        cursor: pointer;
    }
`;

const InputGroup = styled.div`
    background: #fff;
    border-radius: 8px;
    padding-right: 17px;
    display: flex;
    align-items: center;
    height: 45px;
    position: relative;
    @media (max-width:1200px){
        position: absolute;
        width: 95%;
        top: 90px;
        right: calc(50% - 47%);
    }   
    input{
        width: 500px;
        height: 45px;
        background: #fff;
        border-radius: 8px;
        border: none;
        padding-left: 17px;
        font-family: 'Lato', sans-serif;
        font-size: 19px;
        color: #646464;
        outline:none;
        ::-webkit-input-placeholder  { 
            color: #C6C6C6; 
            font-family: 'Lato', sans-serif;
            font-size: 19px;
        }
        @media (max-width:1200px){
        width: 100%;
        } 
    }
`;

const Menu = styled.div`
        position: absolute;
        display: ${props => props.state? 'block': 'none'};
        top: 72px;
        right: 0;
        padding: 11px 35px;
        box-sizing: border-box;
        background-color: #171717;
        border-bottom-left-radius: 20px;
`;

const Usernames = styled.div`
    display: ${props => props.state? "block": "none"};
    position: absolute;
    width: 541px;
    top: 52px;
    right: calc(50% - 278px);
    background-color: #E7E7E7;
    padding: 18px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    @media (max-width:1200px){
        width: 95%;
        right: calc(50% - 47%);
        top: 129px;
    } 
`