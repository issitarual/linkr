import {useContext, useEffect,useState} from 'react'
import UserContext from '../UserContext';
import axios from 'axios'
import ReactHashtag from "react-hashtag";
import {useParams, useHistory} from 'react-router-dom'
import ReactTooltip from 'react-tooltip';
import Loader from "react-loader-spinner";
import { HeartOutline, HeartSharp, RepeatOutline } from 'react-ionicons';
import TrendingList from './TrendingList';
import Repost from './Repost'

/*import de style components*/
import {PostInfo,LinkDescription,Links,Hashtag,Title,TimelineContainer,
Container,TimelinePosts,TimelineContent,LinkDetails,UserName,NoPostsYet,PostContent,PostComment} from '../timelineStyledComponents'
    


export default function OtherUsersPosts(){
     const {id} = useParams()
    const {user} = useContext(UserContext)
    const [posts,setPosts] = useState([])
   const [serverLoading,setServerLoading] = useState(true)
   const [pageUser,setPageUser] = useState(null)
   const [likedPosts, SetLikedPosts] = useState([]);
   const [olderLikes, SetOlderLikes] = useState([]);

   const config = {
        headers:{
            'Authorization' : `Bearer ${user.token}`
        }
    } 

   const history=useHistory()

    useEffect(()=>{
        const getPosts = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`,config)

        getPosts.then((response)=>{
          const newArray = response.data.posts
           setPosts(newArray)
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

    function sendToHashtag(val){
        const newVal = val.replace('#',"")
        history.push(`/hashtag/${newVal}`)
    }

    function RepostButton(id){
        window.confirm("Você quer respostar esse link?");
        const requestRepost = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/share`,{}, config);
        requestRepost.then(() => console.log("deu bom"));
        requestRepost.catch(() => console.log("deu ruim"));

    }
   
   
    return( 
      
    <Container>
        
        <TimelineContainer>
            <Title>{ !serverLoading 
            ? `${pageUser}'s posts`  
            :'Other Posts'}</Title> 
                
                <TimelineContent>

                    <TimelinePosts>
                       

                        {serverLoading 
                            ? <Loader type="Circles" className='loader' color="#FFF"  />
                            : (posts.length===0 
                                ? <NoPostsYet>Este usuário ainda não postou nada</NoPostsYet>
                                :posts.map((post)=>{
                            return(
                            <li key={post.id} id={post.id}>
                                <div className='postLeft'>
                                <img src={post.user.avatar}/>
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
                                    onClick={() => like(post.id)
                                    } onClick={() => like(post.id)}>
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
                                    post.likes.length                                    
                                    } likes
                                </h6>
                                <Repost id={post.id}/>
                                </div>
                                <div className='postRight'>
                                <UserName id={post.user.id}>{post.user.username}</UserName>
                                    <PostComment>
                                    <ReactHashtag 
                                        onHashtagClick={(val) => sendToHashtag(val)}
                                        renderHashtag={(hashtagValue) => (
                                            <Hashtag onClick={()=>history.push(`/hashtag/${hashtagValue.replace('#',"")}`)} >{hashtagValue}</Hashtag>
                                       )}
                                    >
                                            {post.text}
                                    </ReactHashtag>
                                    </PostComment>
                                    <LinkDetails>
                                        <PostInfo>
                                            <h3>{post.linkTitle}</h3>
                                            
                                            <LinkDescription >{post.linkDescription}</LinkDescription>
                                           
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
