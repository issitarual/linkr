import styled from 'styled-components';
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function Register(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");

    const [charging, setCharging] = useState(false);

    let history = useHistory();

    const body = {
        email,
        password,        
        username, 
        pictureUrl
    }

    function SendInfo(event){
        event.preventDefault();
        setCharging(true)

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up", body)
        request.then(goToLogin)
        //request.catch(errors)

        function goToLogin(){
           
            history.push("/")
        }

        // function errors(){
        //     if(campo vazio){alert("Preencha os campos corretamente")}
        //     else if(erro 400){alert("Email inserido já foi cadastro")}
            
        // }
        
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
                    <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                    <input type="text" placeholder="picture url" onChange={(e) => setPictureUrl(e.target.value)} value={pictureUrl} />

                    <button type="submit" disabled={charging}>Sign Up</button>
                </form>
               
                <Link to="/">
                    <p>Switch back to Log In</p>
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
    height: 1050px;
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
    height: 1050px;
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
