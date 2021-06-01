import styled from 'styled-components';
import {useContext, useEffect,useState,useRef} from 'react';
import UserContext from '../UserContext';
import axios from 'axios';
import ReactHashtag from "react-hashtag";
import {useHistory} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Loader from "react-loader-spinner";
import { HeartOutline, HeartSharp } from 'react-ionicons';
import TrendingList from '../Timeline/TrendingList';

/*import de style components*/
import {PostInfo,LinkDescription,Links,Hashtag,Title,TimelineContainer,
Container,TimelinePosts,TimelineContent,LinkDetails,UserName,NoPostsYet,PostContent,PostComment} from '../timelineStyledComponents'
    
    
/*import dos Posts*/
import Posts from '../Posts'

export default function MyLikes({goToLink}){
    const history = useHistory()
    const [likedPosts, setLikedPosts] = useState([]);
    const [olderLikes, setOlderLikes] = useState([]);
    const { user } = useContext(UserContext);
    const [allPosts,setAllPosts] = useState([])
    const [serverLoading,setServerLoading] = useState(true)

    const inputRef = useRef([])

  
    useEffect(()=>{
        const config = {
            headers:{
                'Authorization' : `Bearer ${user.token}`
            }
        }

        const getPosts = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked',config)

        getPosts.then((response)=>{
            const newArray = response.data.posts
            setAllPosts(newArray)
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
    },[])

    
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

    function sendToHashtag(val){
      
        const newVal = val.replace('#',"")
        
        history.push(`/hashtag/${newVal}`)
    }
    return( 
      
    <Container>
        
        <TimelineContainer>
            <h1>my likes</h1> 
                
                <TimelineContent>

                
                    <Posts noPostsMessage={'Você ainda não curtiu nenhum post'}
                            serverLoading={serverLoading}
                            allPosts={allPosts}
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

