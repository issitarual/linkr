import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export default function Users({ avatar, username, following, id, userId, setOtherUsers, setSearch }){
    let history = useHistory();

    return(
        <Container onClick = {() => goToUserPosts(id)}>
            <img src = {avatar}/>
            <h5>{username}</h5>
            <h6>{following === true? "• following": null} </h6>
        </Container>
    )

    function goToUserPosts(id){
        if(id !== userId){
            history.push(`/user/${id}`);
        }
        else{
            history.push(`/my-posts`);
        }
        setOtherUsers("");
        setSearch("");
    }
}

const Container = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 12px;
    }
    h5{
        color: #515151;
        font-size: 19px;
        font-family: 'Lato', sans-serif;
        margin-right: 12px;
    }
    h6{
        color:#C5C5C5;
        font-size: 16px;
        font-family: 'Lato', sans-serif;
    }
`;