import styled from 'styled-components'
import {useContext, useEffect,useState,useRef} from 'react'
import UserContext from '../UserContext';
import axios from 'axios'
import ReactHashtag from "react-hashtag";
import {useParams, useHistory} from 'react-router-dom'
import ReactTooltip from 'react-tooltip';
import Loader from "react-loader-spinner";
import { HeartOutline, HeartSharp } from 'react-ionicons';
import TrendingList from './TrendingList';

/*import de style components*/
import {PostInfo,LinkDescription,Links,Hashtag,Title,TimelineContainer,
Container,TimelinePosts,TimelineContent,LinkDetails,UserName,NoPostsYet,PostContent,PostComment} from '../timelineStyledComponents'
    
/*import dos Posts*/
import Posts from '../Posts'


export default function OtherUsersPosts(){
     const {id} = useParams()
    const {user} = useContext(UserContext)
    const [usersPosts,setUsersPosts] = useState([])
   const [serverLoading,setServerLoading] = useState(true)
   const [pageUser,setPageUser] = useState(null)
   const [likedPosts, SetLikedPosts] = useState([]);
   const [olderLikes, SetOlderLikes] = useState([]);


   const inputRef = useRef([])
   const history=useHistory()

    useEffect(()=>{
        const config = {
            headers:{
                'Authorization' : `Bearer ${user.token}`
            }
        } 

        const getPosts = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`,config)

        getPosts.then((response)=>{
          const newArray = response.data.posts
           setUsersPosts(newArray)
            setPageUser(response.data.posts[0].user.username)
          setServerLoading(false) 
           let sharpedHeart = []
           newArray.forEach( post => {
               post.likes.forEach(n =>{
               if(n.userId === user.user.id){
                   sharpedHeart.push({id: post.id, likes: post.likes.length})
               }})
           })
           SetLikedPosts(sharpedHeart)
           SetOlderLikes(sharpedHeart);
        })

        getPosts.catch((responseError)=>{
            alert(`Houve uma falha ao obter os posts. Por favor atualize a página`)
            return
        })
    },[])


  function goToLink(e,link){
        e.preventDefault()
       window.open(link)
    }

    function changeLoad(){
        setServerLoading(!serverLoading)
        
    }

    function sendToHashtag(val){
        
        const newVal = val.replace('#',"")
       
        history.push(`/hashtag/${newVal}`)
    }
    
   
    return( 
      
    <Container>
        
        <TimelineContainer>
            <Title>{ !serverLoading 
            ? `${pageUser}'s posts`  
            :'Other Posts'}</Title> 
                
                <TimelineContent>

                
                    <Posts noPostsMessage={'Nenhum post encontrado'}
                            //update={update}
                            serverLoading={serverLoading}
                            allPosts={usersPosts}
                            //goToUserPosts={goToUserPosts}
                            olderLikes={olderLikes}
                            likedPosts={likedPosts}
                            user={user}
                            like={like}
                           // tryingToEdit={tryingToEdit}
                          //  config={config}
                            inputRef={inputRef}
                           // setTimelineRef={setTimelineRef}
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

/*const Container = styled.div`
    font-family: Lato;
    width: 100%;
    height: auto;
    min-height: 100vh;
    background-color: #333333;
    display: flex;
    justify-content: center;
`;

const TimelineContainer = styled.div`
    margin-top: 125px;
    width: 1000px;
    height: auto;
    padding-bottom: 30px;
    
    @media (max-width:1200px){
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    h1{
        color: white;
        margin-bottom: 40px;
        font-size: 43px;
        font-family: 'Oswald', sans-serif !important;
        font-weight: bold;
        @media (max-width:1200px){
            margin: 10px auto;
        }
        
    }
    .trending{
        background-color: #171717;
        width: 301px;
        height: 406px;
        position: fixed;
        z-index:0;
        right: 174px;
        top: 226px;
        color: white;
        border-radius: 16px;
        @media (max-width: 1200px){
            display: none;
    
        }
    }
`;
const TimelinePosts = styled.ul`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    
 
    @media (max-width:610px){
        align-items: center;
        width: 100%;
        min-width:360px;
    }

    svg{
        margin: 40px 180px;
    }

    li{
        display: flex;       
        margin-top:10px;
        min-height:276px;
        height: auto;
        border-radius:16px;
        background-color: #171717;
        color: white;
        width: 610px;

        @media (max-width:610px){
            width: 90%;
        }
    }

    .postRight{
        width: 503px;
        height: auto;

       @media (max-width:1200px){
           width: 80%;
       }

       h2{
            font-family: 'Lato', sans-serif!important;
           font-size: 19px;
           color: #fff;
           margin: 20px 20px 7px 20px;
       }

       .postText{
           width: 502px;
           height: auto;
           margin-left: 20px;
           color: #a3a3a3;
           font-family: 'Lato', sans-serif!important;
           font-size: 17px;

           @media (max-width:1200px){
                width: 20%;
            }
        }
    }

    .postLeft{
        width: 87px;
        min-height: 230px;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        @media (max-width:1200px){
           width: 20%;
       }

       img{
           border-radius:50%;
           width: 50px;
           height: 50px;
           margin-top: 20px;
       }
       h6{
        font-family: 'Lato', sans-serif!important;
        font-size: 11px;
        margin-top: 10px;
       }
       .ion-icon{
           margin-top: -30px;
           height: 60px;
       }
    }
`;

const TimelineContent= styled.div`
    display: flex;
    justify-content:  space-between;
    height: auto;

    @media (max-width: 1200px){
        justify-content: center;
    }  
`;

const LinkDetails = styled.div`
    width: 503px;
    height:155px;
    border: 1px solid #4D4D4D;
    margin: 20px 0;
    border-radius: 16px;
    display: flex;
    color: #CECECE;

    @media (max-width:1200px){
        width: 95%;
    }

    img{
        width: 153px;
        height: 155px;
        border-radius: 0px 12px 13px 0px;
    
        @media (max-width:1200px){
            width: 30%;
        }
    }

    img:hover{
        cursor: pointer;
    }

   
`;



const Title = styled.h1`
    font-family: Oswald;
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: white;
`;

const UserName = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 19px;
    line-height: 23px;
    color: white;
    margin-top: 19px;
`;

const PostContent = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 20px;
    margin-top: 10px;
    color: #B7B7B7;
`;

const NoPostsYet = styled.p`
    font-size: 30px;
    color: white;
    margin-top: 20px;
`;*/
