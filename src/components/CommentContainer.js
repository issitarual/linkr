import styled from 'styled-components';
import { PaperPlaneOutline } from 'react-ionicons';
import EachComment from './EachComment';

export default function CommentContainer({ postComments, postId, avatar, setWriteComment, writeComment}){
    return(
        <Container state={postComments.id === postId}>
                {postComments.comment.length > 0? postComments.comment.map(n => <EachComment avatar={n.user.avatar} username = {n.user.username} text={n.text} id={n.user.id}/>): null}    
            <CommentOnThis>
                <img src={avatar}/>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setWriteComment("");
                    alert("comentei");
                }}>
                    <input
                        type = "text"
                        placeholder = "write a comment..."
                        value = {writeComment}
                        onChange={e => setWriteComment(e.target.value)}
                    />
                    <button
                        type="submit"
                    >
                        <PaperPlaneOutline
                            color={'#fff'} 
                            height="25px"
                            width="25px"
                            style={{
                                margin: "0",
                                position: "absolute",
                                left: "8",
                                top: "8"
                            }}
                        />
                    </button>
                </form>
            </CommentOnThis>
        </Container>
    )
}

const Container = styled.div`
    display: ${props => props.state? "block": "none"}
`;
const CommentOnThis = styled.div`
    height: 83px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 25px;
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    input{
        width: 90%;
        height: 40px;
        background-color: #252525;
        font-size: 14px;
        color:#ACACAC;
        font-family: 'Lato', sans-serif;
        outline:none;
        border: none;
        padding: 10px 15px;
        border-bottom-left-radius: 8px;
        border-top-left-radius: 8px;
        ::-webkit-input-placeholder  { 
            color: #575757; 
            font-family: 'Lato', sans-serif;
            font-size: 14px;
        }
    }
    button{
        background-color: #252525;
        width: 40px;
        height: 40px;
        position: relative;
        border-bottom-right-radius: 8px;
        border-top-right-radius: 8px;
    }
    form{
        width: 90%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
`;