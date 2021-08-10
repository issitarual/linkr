import styled from "styled-components";
import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";

import UserContext from "./UserContext";

import {
  ChevronDownOutline,
  ChevronUpOutline,
  SearchOutline,
} from "react-ionicons";

import Users from "./Users";

export default function Header() {
  let history = useHistory();
  const [state, setState] = useState(false);
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [otherUsers, setOtherUsers] = useState([]);
  const [stateSearch, setStateSearch] = useState(false);

  return (
    <>
      <ContainerHeader state={state}>
        <Link to="/timeline">
          <h1>linkr</h1>
        </Link>
        <InputGroup>
          <DebounceInput
            placeholder="Search for people and friends"
            minLength={0}
            debounceTimeout={300}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              searchUser(e.target.value);
            }}
          />
          <SearchOutline
            color={"#C6C6C6"}
            height="25px"
            width="25px"
            style={{
              backgroundColor: "#fff",
            }}
          />
        </InputGroup>
        <span onClick={() => setState(!state)}>
          {state ? (
            <ChevronUpOutline color={"#fff"} height="32px" width="32px" />
          ) : (
            <ChevronDownOutline color={"#fff"} height="32px" width="32px" />
          )}
          <img src={user.user.avatar} alt={user.user.username}/>
        </span>
        <Usernames state={otherUsers.length > 0 && stateSearch}>
          {otherUsers.length > 0
            ? otherUsers.map((n) => (
                <Users
                  avatar={n.avatar}
                  username={n.username}
                  following={n.isFollowingLoggedUser}
                  id={n.id}
                  userId={user.user.id}
                  setOtherUsers={setOtherUsers}
                  setSearch={setSearch}
                />
              ))
            : null}
        </Usernames>
        <Menu state={state}>
          <p onClick={() => link("/my-posts")}>My posts</p>
          <p onClick={() => link("/my-likes")}>My likes</p>
          <p onClick={() => link("/")}>Logout</p>
        </Menu>
        <CloseMenu state={state} onClick={() => setState(!state)} />
      </ContainerHeader>
      <HidePosts />
    </>
  );

  function link(url) {
    if (url === "/") {
      localStorage.clear();
    }
    setState(!state);
    setStateSearch(false);
    setSearch("");
    history.push(url);
  }

  function searchUser(username) {
    if (username.length < 3) {
      setStateSearch(false);
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const promess = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/users/search?username=${username}`,
      config
    );
    promess.then((success) => {
      setOtherUsers(success.data.users);
      setStateSearch(true);
    });
    promess.catch((error) => alert("Ocorreu um erro, tente novamente!"));
  }
}

const ContainerHeader = styled.header`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100vw;
  height: 72px;
  padding: 0px 17px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #151515;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  h1 {
    font-family: "Passion One", cursive;
    font-size: 45px;
    letter-spacing: 5px;
    color: #fff;
  }
  span {
    cursor: pointer;
  }
  img {
    width: 44px;
    height: 44px;
    margin-left: 10px;
    border-radius: 50%;
  }
  p {
    margin: 0;
    margin-bottom: 5px;
    font-family: "Lato", sans-serif;
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
  z-index: 3;
  @media (max-width: 840px) {
    position: absolute;
    width: 94%;
    top: 90px;
    right: 3%;
    left: 3%;
  }

  input {
    width: 500px;
    height: 45px;
    background: #fff;
    border-radius: 8px;
    border: none;
    padding-left: 17px;
    font-family: "Lato", sans-serif;
    font-size: 19px;
    color: #646464;
    outline: none;
    ::-webkit-input-placeholder {
      color: #c6c6c6;
      font-family: "Lato", sans-serif;
      font-size: 19px;
    }
    @media (max-width: 840px) {
      width: 100%;
    }
  }
`;

const Menu = styled.div`
  position: absolute;
  display: ${(props) => (props.state ? "block" : "none")};
  top: 72px;
  right: 0;
  padding: 11px 35px;
  box-sizing: border-box;
  background-color: #171717;
  border-bottom-left-radius: 20px;
  z-index: 8;
`;

const Usernames = styled.div`
  display: ${(props) => (props.state ? "block" : "none")};
  position: absolute;
  width: 542px;
  top: 52px;
  right: calc(50% - 278px);
  background-color: #e7e7e7;
  padding: 18px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  @media (max-width: 840px) {
    width: 94%;
    right: 3%;
    left: 3%;
    top: 129px;
  }
`;

const CloseMenu = styled.div`
  display: ${(props) => (props.state ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 4;
`;

const HidePosts = styled.div`
  background-color: #333;
  height: 140px;
  position: fixed;
  width: 100%;
  z-index: 1;
  display: none;
  @media (max-width: 840px) {
    display: block;
    width: 100%;
  }
`;
