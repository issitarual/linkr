import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function EachComment({ avatar, username, text, id }) {
  const { user } = useContext(UserContext);
  const [followers, setFollowers] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const request = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/users/follows`,
      config
    );
    request.then((success) => setFollowers(success.data.users));
    request.catch((error) => alert(error));
  }, []);
  return (
    <>
      <Container>
        <img src={avatar} alt={username}/>
        <TextComment>
          <span>
            <h5 onClick={() => goToUserPosts(id)}>{username}</h5>
            <h6>
              {user.user.id === id
                ? "• post’s author"
                : followers.map((n) => n.id).includes(id)
                ? "• following"
                : null}
            </h6>
          </span>
          <p>{text}</p>
        </TextComment>
      </Container>
      <Divisor />
    </>
  );
  function goToUserPosts(id) {
    if (id !== user.user.id) {
      history.push(`/user/${id}`);
    } else {
      history.push(`/my-posts`);
    }
  }
}

const Container = styled.div`
  height: 68px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
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
  span {
    margin: 0 !important;
    padding: 0 !important;
    display: flex;
  }
  h5 {
    color: #f3f3f3;
    font-size: 14px;
    font-weight: bold;
    font-family: "Lato", sans-serif;
    cursor: pointer;
  }
  h6 {
    color: #565656;
    font-size: 14px;
    font-family: "Lato", sans-serif;
    margin-left: 5px;
  }
  p {
    color: #acacac;
    font-size: 14px;
    font-family: "Lato", sans-serif;
    margin-top: 7px;
  }
`;

const Divisor = styled.div`
  height: 1px;
  width: 90%;
  background-color: #353535;
  margin: auto;
`;
