import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

export default function InputNewText({
  post,
  update,
  config,
  tryingToEdit,
  toEdit,
  id,
  inputRef,
  setTimelineRef,
}) {
  const [newValue, setNewValue] = useState(post.text);

  useEffect(() => {
    if (toEdit) {
      const nomeQualquer = (event) => {
        if (event.keyCode === 13) {
          textToServer(newValue);
        }

        if (event.keyCode === 27) {
          tryingToEdit(id);
          setNewValue(post.text);
        }
      };
      window.addEventListener("keydown", nomeQualquer);
      return () => {
        window.removeEventListener("keydown", nomeQualquer);
      };
    }
  }, [toEdit, newValue]);

  function textToServer(text) {
    console.clear();

    const body = {
      text: text,
    };

    const promise = axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}`, body, config)
      .then((success) => {
        tryingToEdit(id);
        update();
      })
      .catch((error) => {
        alert("não foi possível salvar as alterações");
      });
  }

  return (
    <InputField
      ref={inputRef}
      onChange={(e) => {
        setNewValue(e.target.value);
      }}
      readOnly={!post.toEdit}
      open={post.toEdit}
      value={newValue === post.text ? post.text : newValue}
    >
      {post.text}
    </InputField>
  );
}

const InputField = styled.textarea`
  display: ${(props) => (props.open ? "initial" : "none")};
  width: 502px;
  height: auto;
  resize: none;
  border-radius: 7px;
  background-color: white;
  padding: 5px;
  font-family: Lato;
  font-weight: 400;
  color: #4c4c4c;
  font-size: 14px;
`;
