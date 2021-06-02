import { HeartOutline, HeartSharp } from 'react-ionicons';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

export default function Likes({post, olderLikes, likedPosts, like, user }){
    return (
        <>
            <Icone 
                data-tip={
                    olderLikes.map(n => n.id).includes(post.id) && !likedPosts.map(n => n.id).includes(post.id)?
                    olderLikes.filter(n => n.id === post.id)[0].likes === 0? "0 pessoas":
                    `${olderLikes.filter(n => n.id === post.id)[0].names[0]} ${olderLikes.filter(n => n.id === post.id)[0].likes - 1 > 0? `e outra(s) ${olderLikes.filter(n => n.id === post.id)[0].likes - 1} pessoas`: ""} `: 
                    likedPosts.map(n => n.id).includes(post.id)? 
                    likedPosts.filter(n => n.id === post.id)[0].likes === 1 ? "Somente você":
                    likedPosts.filter(n => n.id === post.id)[0].likes === 2? `Você e ${likedPosts.filter(n => n.id === post.id)[0].names.filter(n => n !== user.user.username)}`:
                    `Você, ${likedPosts.filter(n => n.id === post.id)[0].names.filter(n => n !== user.user.username)[0]} e outras ${likedPosts.filter(n => n.id === post.id)[0].likes - 2} pessoas`:                                        
                    post.likes.length === 0? "0 pessoas":
                    post.likes.length === 1? `${post.likes.map(n => n["user.username"]).filter(n => n !== user.user.username)[0]}`:
                    post.likes.length === 2? `${post.likes.map(n => n["user.username"]).filter(n => n !== user.user.username)[0]} e  ${post.likes.map(n => n["user.username"]).filter(n => n !== user.user.username)[1]}`:
                    `${post.likes.map(n => n["user.username"]).filter(n => n !== user.user.username)[0]},  ${post.likes.map(n => n["user.username"]).filter(n => n !== user.user.username)[1]} e outras ${post.likes.length -2} pessoas`
                } 
            >
                {likedPosts.map(n=>n.id).includes(post.id)?                                  
                <HeartSharp 
                    onClick={() => like(post.id)}
                    color={'#AC2B25'} 
                    height="25px"
                    width="25px"
                    style={{ 
                        position: 'absolute',
                        bottom: '-40px',
                        left: '-180px'
                    }}
                />:
                <HeartOutline 
                    onClick={() => like(post.id)}
                    color={'#fff'} 
                    height="25px"
                    width="25px"
                    style={{ 
                        position: 'absolute',
                        bottom: '-40px',
                        left: '-180px'
                    }}
                />
                }
                <ReactTooltip 
                    type="light"
                    textColor="#505050"
                    place="bottom"
                    effect="solid"
                    border="5"
                />
            </Icone> 
            <h6>
                {
                likedPosts.map(n => n.id).includes(post.id)?
                likedPosts.filter(n => n.id === post.id)[0].likes:
                olderLikes.map(n => n.id).includes(post.id)?
                olderLikes.filter(n => n.id === post.id)[0].likes:
                post.likes.length
                } likes
            </h6>
        </>
    )
}

const Icone = styled.div`
    margin-top: 10px;
    padding: 0px!important;
    width: 25px;
    height: 25px;
    position: relative;
`;