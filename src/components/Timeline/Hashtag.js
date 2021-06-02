import styled from 'styled-components';
import {useContext, useEffect,useState,useRef} from 'react';
import UserContext from '../UserContext';
import axios from 'axios';
import ReactHashtag from "react-hashtag";
import {useParams,useHistory} from 'react-router-dom';
import Loader from "react-loader-spinner";
import { HeartOutline, HeartSharp } from 'react-ionicons';
import ReactTooltip from 'react-tooltip';
import TrendingList from './TrendingList';

/*import de style components*/
import {PostInfo,LinkDescription,Links,Hashtag,Title,TimelineContainer,
Container,TimelinePosts,TimelineContent,LinkDetails,UserName,NoPostsYet,PostContent,PostComment} from '../timelineStyledComponents'


/*import dos Posts*/
import Posts from '../Posts'

/*InfiniteScroller*/
import InfiniteScroll from 'react-infinite-scroller';
    

export default function OtherUsersPosts({goToLink}){
    const {hashtag} = useParams()

    const history=useHistory()

    const {user} = useContext(UserContext)

    const [hashtagPosts,setHashtagPosts] = useState([])

    const [serverLoading,setServerLoading] = useState(true)
    const [olderLikes, setOlderLikes] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    const inputRef = useRef([])

    /*Logics of infinite Scroller*/ 
  const [maxNumberOfPosts,setMaxNumberOfPosts] = useState(null)
  const[hasMore,setHasMore] = useState(true)
 
  const config = {
    headers:{
        'Authorization' : `Bearer ${user.token}`
    }
} 

    useEffect(()=>{
        updateHashtagPosts()
        
    },[])

    function updateHashtagPosts(newVal){
        const config = {
            headers:{
                'Authorization' : `Bearer ${user.token}`
            }
        } 

       const getPosts = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${newVal || hashtag}/posts`,config)

        getPosts.then((response)=>{
            const newArray = response.data.posts
            
            setMaxNumberOfPosts(response.data.posts.length)
             const partial = []
             
             newArray.forEach((post,index)=>{
                if(index<8){
                    partial.push(post)
                }
            })
          
            setHashtagPosts(partial)
           setServerLoading(false) 
           let sharpedHeart = []
           newArray.forEach( post => {
               post.likes.forEach(n =>{
               if(n.userId === user.user.id){
                   sharpedHeart.push({id: post.id, likes: post.likes.length, names: post.likes.map(n => n["user.username"])})
               }})
           })
           setLikedPosts(sharpedHeart);
           setOlderLikes(sharpedHeart);

        })

        getPosts.catch((responseError)=>{
            alert(`Houve uma falha ao obter os posts. Por favor atualize a página`)
            return
        })
    }

    function partialUpdate(limit){
        
        setTimeout(()=>{
            const getPosts = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`,config)
        
        getPosts.then((response)=>{
            const newArray = (response.data.posts.map((p)=>({...p, toEdit: false})));
          //  const partial = newArray.slice(0,limit)
           
          const partial =[...hashtagPosts]
        
          for(let i = limit; i<limit+10;i++){
                if(i===newArray.length){
                    break;
                }
                  partial.push(newArray[i])
              
          }

          setHashtagPosts(partial)
            let sharpedHeart = []
            newArray.forEach( post => {
                post.likes.forEach(n =>{
                if(n.userId === user.user.id){
                    sharpedHeart.push({id: post.id, likes: post.likes.length, names: post.likes.map(n => n["user.username"])})
                }})
            })
            setLikedPosts(sharpedHeart);
            setOlderLikes(sharpedHeart);
        })

        },2000)

       maxNumberOfPosts===hashtagPosts.length ? setHasMore(false) : setHasMore(true)
    }


    function sendToHashtag(val){
        const newVal = val.replace('#',"")
       
        setServerLoading(true) 
        updateHashtagPosts(newVal)

        history.push(`/hashtag/${newVal}`)
    }

    function goToUserPosts(id){
        if(id!==user.user.id){
        history.push(`/user/${id}`)
        }
        else{
            history.push(`/my-posts`)
        }
    }
   
    return( 
      
    <Container>
        
        <TimelineContainer>
            <h1>{ !serverLoading 
            ? `#${hashtag}'s posts`  
            :'carregando'}</h1> 
                
                <TimelineContent>

                    {/*<InfiniteScroll
                        pageStart={0}
                        loadMore={() => partialUpdate( hashtagPosts.length)}
                        hasMore={hasMore}
                        loader={<div className="Scroller mid" key={0}>Loading More Posts..</div>}
                        className='Scroller'
                        threshold={250}
                    >  */}
                        <Posts noPostsMessage={'Não há posts dessa hashtag no momento'}
                                    serverLoading={serverLoading}
                                    allPosts={hashtagPosts}
                                    goToUserPosts={goToUserPosts}
                                    olderLikes={olderLikes}
                                    likedPosts={likedPosts}
                                    user={user}
                                    like={like}
                                    inputRef={inputRef}
                                    goToLink={goToLink}
                                    sendToHashtag={sendToHashtag}
                        />

                   {/*} </InfiniteScroll>*/}
                            
                           
                          
                            
                                        

                    <TrendingList send={sendToHashtag}/>

                </TimelineContent>
        </TimelineContainer>

    </Container>
    )
    function like (id){
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }
        if(likedPosts.map(n => n.id).includes(id)){
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/dislike`, {}, config)
            request.then(success => {
                setLikedPosts(likedPosts.filter( (n,i) => n.id !== id))
                if(olderLikes.map(n => n.id).includes(id))
                setOlderLikes([... olderLikes.filter( (n,i) => n.id !== id), {id: id, likes: success.data.post.likes.length, names: success.data.post.likes.map(n => n.username)}])
            });
            request.catch(error => alert ("Ocorreu um erro, tente novamente."))
        }
        else{
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`, {}, config)
            request.then(success => {
                setLikedPosts([...likedPosts, {id: id, likes: success.data.post.likes.length, names: success.data.post.likes.map(n => n.username)}])
                if(olderLikes.map(n => n.id).includes(id)){
                    setOlderLikes([...olderLikes.filter( (n,i) => n.id !== id), {id: id, likes: success.data.post.likes.length, names: success.data.post.likes.map(n => n.username)}])
                }
            });
            request.catch(error => alert ("Ocorreu um erro, tente novamente."))
        }
    }
}

