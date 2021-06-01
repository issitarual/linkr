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
    

export default function OtherUsersPosts(){
    const {hashtag} = useParams()

    const history=useHistory()

    const {user} = useContext(UserContext)

    const [hashtagPosts,setHashtagPosts] = useState([])

    const [serverLoading,setServerLoading] = useState(true)
    const [olderLikes, SetOlderLikes] = useState([]);
    const [likedPosts, SetLikedPosts] = useState([]);

    const inputRef = useRef([])

    useEffect(()=>{
        updateHashtagPosts()
        
    },[hashtag])

    function updateHashtagPosts(newVal){
        const config = {
            headers:{
                'Authorization' : `Bearer ${user.token}`
            }
        } 

       const getPosts = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${newVal || hashtag}/posts`,config)

        getPosts.then((response)=>{
            const newArray = response.data.posts
            setHashtagPosts(newArray)
           setServerLoading(false) 
            let sharpedHeart = []
            newArray.forEach( post => {
                post.likes.forEach(n =>{
                if(n.userId === user.user.id){
                    sharpedHeart.push({id: post.id, likes: post.likes.length})
                }})
            })
            SetLikedPosts(sharpedHeart);
            SetOlderLikes(sharpedHeart);

        })

        getPosts.catch((responseError)=>{
            alert(`Houve uma falha ao obter os posts. Por favor atualize a página`)
            return
        })
    }

  function goToLink(e,link){
        e.preventDefault()
        window.open(link)
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
                />
                            
                           
                          
                            
                                        

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
        if(olderLikes.map(n => n.id).includes(id) && likedPosts.map(n => n.id).includes(id)){
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/dislike`, {}, config)
            request.then(success => {
                SetOlderLikes(olderLikes.map( (n,i) => n.id === id? {id: id, likes: n.likes -1}: n))
                SetLikedPosts(likedPosts.filter( (n,i) => n.id !== id))
            });
            request.catch(error => alert ("Ocorreu um erro, tente novamente."))
        }
        else if(olderLikes.map(n => n.id).includes(id)){
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`, {}, config)
            request.then(success => {
                SetLikedPosts([...likedPosts, {id: id, likes: success.data.post.likes.length}])
                SetOlderLikes(olderLikes.map( (n,i) => n.id === id? {id: id, likes: n.likes +1}: n))
            });
            request.catch(error => alert ("Ocorreu um erro, tente novamente."))
        }
        else if(likedPosts.map(n => n.id).includes(id)){
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/dislike`, {}, config)
            request.then(success => {
                SetLikedPosts(likedPosts.filter( (n,i) => n.id !== id))
            });
            request.catch(error => alert ("Ocorreu um erro, tente novamente."))
        }
        else{
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`, {}, config)
            request.then(success => {
                SetLikedPosts([...likedPosts, {id: id, likes: success.data.post.likes.length}])
            });
            request.catch(error => alert ("Ocorreu um erro, tente novamente."))
        }
    }
}

