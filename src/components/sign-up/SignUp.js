import styled from 'styled-components';
import { Link } from "react-router-dom";
//import axios from 'axios';

export default function Register(){
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
                <Form>
                    <input type="text" placeholder="e-mail"></input>
                    <input type="text" placeholder="password"></input>
                    <input type="text" placeholder="username"></input>
                    <input type="text" placeholder="picture url"></input>
                    <button>Sign Up</button>
                </Form>
               
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
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`