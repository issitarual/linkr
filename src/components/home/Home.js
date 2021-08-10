import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import UserContext from "../UserContext";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [charging, setCharging] = useState(false);

  const { user, setUser } = useContext(UserContext);

  let history = useHistory();

  useEffect(() => {
    if (localStorage.length !== 0) {
      const listString = localStorage.getItem("list");
      const list = JSON.parse(listString);
      setUser(list);
      history.push("/timeline");
    }
  }, []);

  const body = {
    email,
    password,
  };

  function SendInfo(event) {
    event.preventDefault();
    setCharging(true);

    if (body.email === "" || body.password === "") {
      alert("Por favor preencher todos os campos corretamente");
    }
    console.log(process.env.REACT_APP_API_BASE_URL)
    const request = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/sign-in`,
      body
    );
    request.then((response) => {
      setUser(response.data);

      const infos = { token: response.data.token, user: response.data.user };
      const infosString = JSON.stringify(infos);
      localStorage.setItem("list", infosString);
      history.push("/timeline");
    });

    request.catch(errors);
  }

  function errors(error) {
    setCharging(false);
    if (error.response.status === 403) {
      alert("Email ou Senha incorretos");
    }
  }

  return (
    <FrontPage>
      <RightSide>
        <div>
          <h1>linkr</h1>
          <p>
            save, share and discover <br /> the best links on the web
          </p>
        </div>
      </RightSide>

      <LeftSide>
        <form onSubmit={SendInfo}>
          <input
            type="text"
            placeholder="e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button type="submit" disabled={charging}>
            Log In
          </button>
        </form>

        <Link to="/sign-up">
          <p>First time? Creat an account!</p>
        </Link>
      </LeftSide>
    </FrontPage>
  );
}

const FrontPage = styled.div`
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const RightSide = styled.div`
  width: 70%;
  height: 100vh;
  background: #151515;
  color: #fff;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
    height: 175px;
  }
  @media (max-width: 420px) {
    width: 100%;
    height: auto;
  }

  h1 {
    font-size: 106px;
    letter-spacing: 10px;
    line-height: 116px;
    font-family: "Passion One", cursive;

    @media (max-width: 600px) {
      font-size: 76px;
      letter-spacing: 7px;
      line-height: 83px;
    }
  }

  p {
    font-size: 43px;
    line-height: 63px;
    font-family: "Oswald", sans-serif;

    @media (max-width: 600px) {
      font-size: 23px;
      letter-spacing: 7px;
      line-height: 34px;
    }
  }

  div {
    display: flex;
    flex-direction: column;

    @media (max-width: 600px) {
      align-items: center;
    }
  }
`;

const LeftSide = styled.div`
  width: 30%;
  height: 100vh;
  background: #333333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
    // height: 500px;
  }

  @media (max-width: 600px) {
    width: 100%;
    // height: 500px;
  }

  input {
    width: 429px;
    height: 65px;
    border: none;
    border-radius: 5px;
    margin-bottom: 7px;
    font-family: "Oswald", sans-serif;
    font-size: 27px;
    padding-left: 15px;

    @media (max-width: 1500px) {
      width: 95%;
    }
  }

  button {
    width: 429px;
    height: 65px;
    background: #1877f2;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: "Oswald", sans-serif;
    color: #fff;
    font-size: 27px;
    line-height: 40px;

    @media (max-width: 1500px) {
      width: 95%;
    }
  }

  p {
    color: #fff;
    font-size: 20px;
    font-family: "Lato", sans-serif;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
