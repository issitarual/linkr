import ReactHashtag from "react-hashtag";
import {useHistory} from 'react-router-dom';
import Loader from "react-loader-spinner";
import { RepeatOutline } from 'react-ionicons';
import getYouTubeID from 'get-youtube-id';
import ActionsPost from './Timeline/ActionsPost';
import InputNewText from './Timeline/InputNewText';
import Likes from './likes';
import Comments from '../components/Comments/Comments';
import CommentContainer from '../components/Comments/CommentContainer';
import Repost from './repost/Repost'
import styled from 'styled-components';
import {useState} from 'react'

/*import de style components*/
import {PostInfo,LinkDescription,Links,Hashtag,
TimelinePosts,LinkDetails,UserName,NoPostsYet,PostContent,IframeContent} from '../components/timelineStyledComponents'


    
 
export default function Posts(props){
    const [writeComment, setWriteComment] = useState("");
    const [postComments, setPostComments] = useState({id: null, comment:[]});
    
    function YoutubeId(post){
        const getYouTubeID = require('get-youtube-id');
        const id = getYouTubeID(post.link);
    
        if(id){

            <LinkDetails id={id}/>
            return(
            <IframeContent>
            <iframe height='280' width='100%'
                src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1`}>
            </iframe>
            <Links href={post.link} onClick={(e)=>goToLink(e,post.link)}>{post.link}</Links>
            </IframeContent>
            )
        }else{
           return(
             <>
             <PostInfo>
                <h3>{post.linkTitle}</h3>
                <LinkDescription>{post.linkDescription}</LinkDescription>
                 <Links href={post.link} onClick={(e)=>goToLink(e,post.link)}>{post.link}</Links>
            </PostInfo>
                       
             <img src={post.linkImage} onClick={(e)=>goToLink(e,post.link)}/>
            </>
           )
        }
    
     }

     function saveOtherUserInfo(userInfo){
        
         if(userInfo["repostedBy"]){
             
            goToUserPosts(userInfo.user.id)
           
            }else{
                goToUserPosts(userInfo.user.id)
            }

    }
    const history=useHistory()

    const {noPostsMessage,update,serverLoading,allPosts,goToUserPosts,olderLikes,likedPosts,user,like,tryingToEdit,
    config,inputRef,setTimelineRef,goToLink,sendToHashtag,getUsersPosts} = props;

return(
    <TimelinePosts>
        {serverLoading 
            ? <Loader type="Circles" className='loader' color="#FFF"  />
            : (allPosts.length===0 
            ? <NoPostsYet>{noPostsMessage}</NoPostsYet>
            :allPosts.map((post)=>{
            return(
                <li key={post.id} id={post.id}>
                    {
                        post["repostedBy"] ? 
                        (<RepostIcon>
                            <RepeatOutline
                                color={'#ffffff'}
                                height="20px"
                                width="20px"
                                style={{
                                    margin: "0",
                                    marginRight: "10",
                                    marginBottom: "10"            
                                }}
                            />
                            Re-posted by {user.user.username === post.repostedBy.username ? "you" : post.repostedBy.username}
                        </RepostIcon>) :
                        ""
                    }
                    <div className = "oficialPost">    
                        <div className='postLeft'>
                            <img src={post.user.avatar} onClick={()=>goToUserPosts(post.user.id)}/>
                            <Likes 
                                post={post} 
                                olderLikes={olderLikes} 
                                likedPosts = {likedPosts}
                                user={user}
                                like={like}
                            />
                            <Comments 
                                post={post} 
                                postComments = {postComments} 
                                setPostComments={setPostComments} 
                                setWriteComment={setWriteComment}
                            />
                            <Repost 
                                id={post.id} 
                                count={post.repostCount}
                            />
                        </div>
                        <div className='postRight'>
                            <ActionsPost update={update} post={post} tryingToEdit={tryingToEdit} id={post.id}/>
                            <UserName id={post.user.id} onClick={()=>saveOtherUserInfo(post)}>{post.user.username}</UserName>
                            <PostContent open={!post.toEdit} >
                                <ReactHashtag 
                                    renderHashtag={(hashtagValue) => (
                                        <Hashtag className='hashtagSpan' onClick={()=>(sendToHashtag(hashtagValue))}>{hashtagValue}</Hashtag>
                                    )}
                                >
                                    {post.text}  
                                </ReactHashtag>
                            </PostContent>                                        
                            <InputNewText update={update} id={post.id} tryingToEdit={tryingToEdit} post={post} config={config} toEdit={post.toEdit} inputRef={inputRef} setTimelineRef={setTimelineRef}/>
                            <LinkDetails id1={getYouTubeID(post.link)}>                                                
                                {YoutubeId(post)}            
                            </LinkDetails>
                        </div>
                    </div>
                    <CommentContainer setPostComments={setPostComments} idComment = {post.id} postComments = {postComments} postId = {post.repostId? post.repostId: post.id} avatar = {user.user.avatar} setWriteComment={setWriteComment} writeComment={writeComment}/>
                </li>   
            )}))}        
    </TimelinePosts>
    )
}

const RepostIcon = styled.div`
    font-family: 'Lato', sans-serif!important;
    font-size: 11px;
    display:flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 20px;
    width: 503px;
    margin-left:118px;
    color: #fff;
    @media(max-width:1200px){
        margin-left:118px;
    }
    
    @media(max-width:690px){
        margin-left:0px;
        width: 100%;
    }
   
`;