import styled from 'styled-components';
import {useContext, useEffect,useState,useRef} from 'react';
import NewPost from './NewPost';
import UserContext from '../UserContext';
import axios from 'axios';
import ReactHashtag from "react-hashtag";
import {useHistory} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Loader from "react-loader-spinner";
import ActionsPost from './ActionsPost';
import TrendingList from './TrendingList';
import { HeartOutline, HeartSharp } from 'react-ionicons';
import InputNewText from './InputNewText';
import LinkPreview from './LinkPreview'

import getYouTubeID from 'get-youtube-id';

/*import dos Posts*/
import Posts from '../Posts'

/*InfiniteScroller*/
import InfiniteScroll from 'react-infinite-scroller';

/*import de style components*/
import {PostInfo,LinkDescription,Links,Hashtag,Title,TimelineContainer,
Container,TimelinePosts,TimelineContent,LinkDetails,UserName,NoPostsYet,PostContent} from '../timelineStyledComponents'

/* Import UseInterval custom hook*/
import UseInterval from '../UseInterval'

export default function Timeline({goToLink}){
    const history = useHistory()
    const [likedPosts, setLikedPosts] = useState([]);
    const { user ,setUser} = useContext(UserContext);
    const [allPosts,setAllPosts] = useState([]);
    const [serverLoading,setServerLoading] = useState(true);
    const [olderLikes, setOlderLikes] = useState([]); 

    const inputRef = useRef([])

    const [timelineRef,setTimelineRef] = useState(false);
    /*Logics of infinite Scroller*/ 
    const [maxNumberOfPosts,setMaxNumberOfPosts] = useState(null)
    const[hasMore,setHasMore] = useState(true)


    
    

   
    
    useEffect(()=>{
            update()
            const getYouTubeID = require('get-youtube-id');
            const id = getYouTubeID("https://www.youtube.com/watch?v=lwGA_O9vpk0");
           //const getYouTubeID2 = require('get-youtube-id');
           //const id2 = getYouTubeID2("https://www.youtube.com/");
           console.log(id)
           // console.log(id2)

           console.log(getYouTubeID("https://www.youtube.com/watch?v=lwGA_O9vpk0"))
                  
    },[]);

    UseInterval(() => {
    
    const getNewPosts = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts',config)

    getNewPosts.then((response)=>{
     
     const holder = allPosts[0]

       let numberHolder='x'

       response.data.posts.forEach((post,index)=>{
            if(post.id===holder.id){
                numberHolder=index
            }
       })
       const newPosts = response.data.posts.splice(0,numberHolder)
        setAllPosts([...newPosts,...allPosts])

    })
    

       }, 15000); 

    const config = {
        headers:{
            'Authorization' : `Bearer ${user.token}`
        }
    }

    function partialUpdate(limit){
        
       setTimeout(()=>{
            const getPosts = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts',config)
        
        getPosts.then((response)=>{
            const newArray = (response.data.posts.map((p)=>({...p, toEdit: false})));

          const partial2 =[...allPosts]
        
          for(let i = limit; i<limit+10;i++){
                if(i===newArray.length){
                    break;
                }
                  partial2.push(newArray[i])
              
          }

          setAllPosts(partial2)
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

       maxNumberOfPosts===allPosts.length ? setHasMore(false) : setHasMore(true)
    }

    function update () {
        
        const getPosts = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts',config)
        setServerLoading(true)
        
        getPosts.then((response)=>{
            const newArray = (response.data.posts.map((p)=>({...p, toEdit: false})));
            console.log(newArray)
          
            setMaxNumberOfPosts(response.data.posts.length)
            const partial2 = []
            
            newArray.forEach((post,index)=>{
               if(index<8){
                   partial2.push(post)
               }
           })

            setAllPosts(partial2)
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
        
   

    function sendToHashtag(val){
       
        const newVal = val.replace('#',"")
        
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

    function tryingToEdit(id) {
        let postsToEdit = allPosts.map((p) => {
            if(p.id === id){
                p.toEdit = !p.toEdit;
            }
            return {...p};
        })   
        setAllPosts([...postsToEdit]);

        setTimeout(()=>{

            inputRef.current[id].focus()
           },100) 
    }

   
    return( 
        
        <Container>
            
            <TimelineContainer>
            <Title>timeline</Title> 
            <NewPost/>
                    <TimelineContent>
                      
                        
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={() => partialUpdate( allPosts.length)}
                            hasMore={hasMore}
                            loader={<div className="Scroller mid" key={0}>Loading More Posts..</div>}
                            className='Scroller'
                           // useWindow={false}
                            //threshold={0}
                            isReverse={false}
                        >
                            
                            <Posts noPostsMessage={'Nenhum post encontrado'}
                                update={update}
                                serverLoading={serverLoading}
                                allPosts={allPosts}
                                goToUserPosts={goToUserPosts}
                                olderLikes={olderLikes}
                                likedPosts={likedPosts}
                                user={user}
                                like={like}
                                tryingToEdit={tryingToEdit}
                                config={config}
                                inputRef={inputRef}
                                goToLink={goToLink}
                                
                            />

                        </InfiniteScroll>

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

