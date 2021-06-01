import styled from 'styled-components';
import {useContext, useEffect,useState,useRef} from 'react';
import NewPost from './Timeline/NewPost';

import axios from 'axios';
import ReactHashtag from "react-hashtag";
import {useHistory} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Loader from "react-loader-spinner";
import ActionsPost from './Timeline/ActionsPost';
import TrendingList from './Timeline/TrendingList';
import { HeartOutline, HeartSharp } from 'react-ionicons';
import InputNewText from './Timeline/InputNewText'



/*import de style components*/
import {PostInfo,LinkDescription,Links,Hashtag,Title,TimelineContainer,
Container,TimelinePosts,TimelineContent,LinkDetails,UserName,NoPostsYet,PostContent} from '../components/timelineStyledComponents'
 
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
            <div className='postLeft'>
            <img src={post.user.avatar} onClick={()=>goToUserPosts(post.user.id)}/>
            <div className ="ion-icon" data-tip={
                olderLikes.map(n => n.id).includes(post.id) && !likedPosts.map(n => n.id).includes(post.id)?
                olderLikes.filter(n => n.id === post.id)[0].likes === 0? "0 pessoas":
                `${post.likes.map(n => n["user.username"]).filter(n => n !== user.user.username)[0]} e outra(s) ${post.likes.length -2 > 0? post.likes.length -2: "0"} pessoas`:                      
                likedPosts.map(n => n.id).includes(post.id)? 
                likedPosts.filter(n => n.id === post.id)[0].likes === 1 ? "Somente você":
                likedPosts.filter(n => n.id === post.id)[0].likes === 2? `Você e ${post.likes.map(n => n["user.username"]).filter(n => n !== user.user.username)[0]}`:
                `Você, ${post.likes.map(n => n["user.username"]).filter(n => n !== user.user.username)[0]} e outras ${post.likes.length -1} pessoas`:
                post.likes.length === 0? "0 pessoas":
                post.likes.length === 1? `${post.likes.map(n => n["user.username"]).filter(n => n !== user.user.username)[0]}`:
                post.likes.length === 2? `${post.likes.map(n => n["user.username"]).filter(n => n !== user.user.username)[0]} e  ${post.likes.map(n => n["user.username"]).filter(n => n !== user.user.username)[1]}`:
                `${post.likes.map(n => n["user.username"]).filter(n => n !== user.user.username)[0]},  ${post.likes.map(n => n["user.username"]).filter(n => n !== user.user.username)[1]} e outras ${post.likes.length -2} pessoas`
            } 
                onClick={() => like(post.id)}>
                {likedPosts.map(n=>n.id).includes(post.id)?                                  
                <HeartSharp
                    color={'#AC2B25'} 
                    height="25px"
                    width="25px"
                />:
                <HeartOutline
                    color={'#fff'} 
                    height="25px"
                    width="25px"
                />
                }
                <ReactTooltip 
                    type="light"
                    textColor="#505050"
                    place="bottom"
                    effect="solid"
                    border="5"
                />
            </div> 
            <h6>
                {
                olderLikes.map(n => n.id).includes(post.id)?
                olderLikes.filter(n => n.id === post.id)[0].likes:
                likedPosts.map(n => n.id).includes(post.id)?
                likedPosts.filter(n => n.id === post.id)[0].likes:
                 post.likes.length} likes
            </h6>
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
        </li>   
        )
    })
        )
    }

  
</TimelinePosts>

)

 }