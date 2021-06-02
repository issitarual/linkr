import ReactHashtag from "react-hashtag";
import {useHistory} from 'react-router-dom';
import Loader from "react-loader-spinner";
import ActionsPost from './Timeline/ActionsPost';
import { RepeatOutline } from 'react-ionicons';
import InputNewText from './Timeline/InputNewText';
import Repost from './repost/Repost';
import Likes from './likes';
import Comments from './Comments';
import styled from 'styled-components';

/*import de style components*/
import {PostInfo,LinkDescription,Links,Hashtag,TimelinePosts,LinkDetails,UserName,NoPostsYet,PostContent} from '../components/timelineStyledComponents'
 
export default function Posts(props){

    const history=useHistory()

    const {noPostsMessage,update,serverLoading,allPosts,goToUserPosts,olderLikes,likedPosts,user,like,tryingToEdit,
    config,inputRef,setTimelineRef,goToLink} = props;

return(
<TimelinePosts>

        {serverLoading 
            ? <Loader type="Circles" className='loader' color="#FFF"  />
            : (allPosts.length===0 
                ? <NoPostsYet>{noPostsMessage}</NoPostsYet>
                :allPosts.map((post)=>{
            return(
            <li key={post.id} id={post.id}>
                {post["repostedBy"] ? 
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
                        </RepostIcon>) : ""}
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
            <Comments post={post}/>
            <Repost id={post.id} />
            </div>

                    <div className='postRight'>
                        <ActionsPost update={update} post={post} tryingToEdit={tryingToEdit} id={post.id}/>
                        <UserName id={post.user.id} onClick={()=>goToUserPosts(post.user.id)}>{post.user.username}</UserName>

                        <PostContent open={!post.toEdit} >
                            <ReactHashtag 
                                renderHashtag={(hashtagValue) => (
                                <Hashtag onClick={()=>history.push(`/hashtag/${hashtagValue.replace('#',"")}`)} >{hashtagValue}</Hashtag>
                                )}
                            >
                                {post.text}  
                            </ReactHashtag>
                        </PostContent>    

                        <InputNewText update={update} id={post.id} tryingToEdit={tryingToEdit} post={post} config={config} toEdit={post.toEdit} inputRef={inputRef} setTimelineRef={setTimelineRef}/>

                        <LinkDetails>
                            <PostInfo>
                                <h3>{post.linkTitle}</h3>
                                
                                <LinkDescription>{post.linkDescription}</LinkDescription>
                            
                                <Links href={post.link} onClick={(e)=>goToLink(e,post.link)}>{post.link}</Links>
                            </PostInfo> 
                            <img src={post.linkImage} onClick={(e)=>goToLink(e,post.link)}/>                      
                        </LinkDetails>
                    </div>
                </div>
            </li>   
            )
        })
            )
        }

        
    </TimelinePosts>
    )

 }

 const RepostIcon = styled.span`
    font-family: 'Lato', sans-serif!important;
    font-size: 11px;
    display:flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 20px;
`