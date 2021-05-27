import styled from 'styled-components';
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import axios from 'axios';

import UserContext from '../UserContext';

export default function Home(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [charging, setCharging] = useState(false);

    const {setUser} = useContext(UserContext);

    let history = useHistory();

    const body = {
        email,
        password,        
    }

    function SendInfo(event){
        event.preventDefault();
        setCharging(true)

        if(body.email === "" || body.password === ""){
            alert("Por favor preencher todos os campos corretamente")
        }


        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in", body);
        request.then((response) => {setUser(response.data);
           // console.log(response)
            history.push("/timeline")
        });
        request.catch(errors)
    }

    function errors(error){
        setCharging(false);
        if(error.response.status === 403){
            alert("Email ou Senha incorretos")
        } 
    }


    return(
        <FrontPage>
            <RightSide>
                <div>
                    <h1>
                        linkr
                    </h1>
                    <p>
                        save, share and discover <br/> the best links on the web
                    </p>
                </div>
            </RightSide>

            <LeftSide>
                <form onSubmit={SendInfo}>
                    <input type="text" placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />

                    <button type="submit" disabled={charging}>Log In</button>
                </form>
               
                <Link to="/sign-up">
                    <p>First time? Creat an account!</p>
                </Link>
                
            </LeftSide>
        </FrontPage>
    )
}

const FrontPage = styled.div`
    display: flex;
`;

const RightSide = styled.div`
    width: 905px;
    height: 1000px;
    background: #151515;
    color: #fff;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;

    h1{
        font-size: 106px;
        letter-spacing: 10px;
        line-height: 116px;
        font-family: 'Passion One', cursive;
    }

    p{
        font-size: 43px;
        line-height: 63px;
        font-family: 'Oswald', sans-serif;
    }

    div{
        display: flex;
        flex-direction: column;
    }
`;

const LeftSide = styled.div` 
    width: 600px;
    height: 1000px;
    background: #333333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input{
        width: 429px;
        height: 65px;
        border:none;
        border-radius: 5px;
        margin-bottom: 7px;
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        padding-left: 15px;
    }

    button{
        width: 429px;
        height: 65px;
        background: #1877F2;
        border:none;
        border-radius: 5px;
        margin-bottom: 10px;
        font-family: 'Oswald', sans-serif;
        color: #fff;
        font-size: 27px;
        line-height: 40px;
    }

    p{
        color: #fff;
        font-size: 20px;
        font-family: 'Lato', sans-serif;

    }

    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

`;
