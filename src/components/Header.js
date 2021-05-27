import styled from 'styled-components';
import { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import UserContext from './UserContext';

import { ChevronDownOutline, ChevronUpOutline } from 'react-ionicons';

export default function Header (){
    let history = useHistory();
    const [state, setState] = useState(false)
    const { user } = useContext(UserContext);
    
    return(
        <ContainerHeader state={state}>
            <Link to ="/timeline">
                <h1>linkr</h1>
            </Link>
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
            <div>
                    <p onClick={() => link("/my-posts")}>My posts</p>
                    <p onClick={() => link("/my-likes")}>My likes</p>
                    <p onClick={() => link("/")}>Logout</p>
            </div>
        </ContainerHeader>
    )

    function link (url){
        if(url === "/"){
            localStorage.clear();
        }
        setState(!state);
        history.push(url); 
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
    div{
        position: absolute;
        display: ${props => props.state? 'block': 'none'};
        top: 72px;
        right: 0;
        padding: 11px 35px;
        box-sizing: border-box;
        background-color: #171717;
        border-bottom-left-radius: 20px;
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
