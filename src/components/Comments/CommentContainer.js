import styled from "styled-components";
import { PaperPlaneOutline } from "react-ionicons";
import EachComment from "./EachComment";
import axios from "axios";
import UserContext from "../UserContext";
import { useContext } from "react";

export default function CommentContainer({
  postComments,
  setPostComments,
  postId,
  avatar,
  setWriteComment,
  writeComment,
  idComment,
  author
}) {
  const { user } = useContext(UserContext);

  return (
    <Container state={postComments.id === postId}>
      {postComments.comment.length > 0
        ? postComments.comment.map((n) => (
            <EachComment
              avatar={n.user.avatar}
              username={n.user.username}
              text={n.text}
              id={n.user.id}
            />
          ))
        : null}
      <CommentOnThis>
        <img src={avatar} alt={author}/>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setWriteComment("");
            addComment();
          }}
        >
          <input
            type="text"
            placeholder="write a comment..."
            value={writeComment}
            onChange={(e) => setWriteComment(e.target.value)}
          />
          <button type="submit">
            <PaperPlaneOutline
              color={"#fff"}
              height="25px"
              width="25px"
              style={{
                margin: "0",
                position: "absolute",
                left: "8",
                top: "8",
              }}
            />
          </button>
        </form>
      </CommentOnThis>
    </Container>
  );
  function addComment() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const data = { text: `${writeComment}` };
    const request = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/posts/${idComment}/comment`,
      data,
      config
    );
    request.then((success) => {
      const { id, text, userId } = success.data.comment;
      const { avatar, username } = user.user;
      setPostComments({
        id: postId,
        comment: [
          ...postComments.comment,
          {
            id: id,
            text: text,
            user: {
              id: userId,
              username: username,
              avatar: avatar,
            },
          },
        ],
      });
    });
    request.catch((error) => alert(error));
  }
}

const Container = styled.div`
  display: ${(props) => (props.state ? "block" : "none")};
`;
const CommentOnThis = styled.div`
  height: 83px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  input {
    width: 90%;
    height: 40px;
    background-color: #252525;
    font-size: 14px;
    color: #acacac;
    font-family: "Lato", sans-serif;
    outline: none;
    border: none;
    padding: 10px 15px;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    ::-webkit-input-placeholder {
      color: #575757;
      font-family: "Lato", sans-serif;
      font-size: 14px;
    }
  }
  button {
    background-color: #252525;
    width: 40px;
    height: 40px;
    position: relative;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
  }
  form {
    width: 90%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;
