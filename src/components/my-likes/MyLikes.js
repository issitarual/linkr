import {useContext, useEffect,useState} from 'react';
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
    

export default function MyLikes(){
    const history = useHistory()
    const [likedPosts, SetLikedPosts] = useState([]);
    const [olderLikes, SetOlderLikes] = useState([]);
    const { user } = useContext(UserContext);
    const [allPosts,setAllPosts] = useState([])
    const [serverLoading,setServerLoading] = useState(true)

  
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
                if(n.username === user.user.username){
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

                    <TimelinePosts>

                        {serverLoading 
                            ? <Loader type="Circles"  className='loader'  color="#FFF" />
                            : (allPosts.length===0 
                                ? <NoPostsYet>Nenhum post curtido</NoPostsYet>
                                :allPosts.map((post)=>{

                            return(
                            <li key={post.id} id={post.id}>
                                <div className='postLeft'>
                                <img src={post.user.avatar} onClick={()=>(history.push(`/user/${post.user.id}`))}/>
                                <div className ="ion-icon" data-tip={
                                    olderLikes.map(n => n.id).includes(post.id) && !likedPosts.map(n => n.id).includes(post.id)?
                                    olderLikes.filter(n => n.id === post.id)[0].likes === 0? "0 pessoas":
                                    `${post.likes.map(n => n.username).filter(n => n !== user.user.username)[0]} ${post.likes.length -2 > 0? `e outra(s) ${post.likes.length -2} pessoas`: ""} `:                      
                                    likedPosts.map(n => n.id).includes(post.id)? 
                                    likedPosts.filter(n => n.id === post.id)[0].likes === 1 ? "Somente você":
                                    likedPosts.filter(n => n.id === post.id)[0].likes === 2? `Você e ${post.likes.map(n => n.username).filter(n => n !== user.user.username)[0]}`:
                                    `Você, ${post.likes.map(n => n.username).filter(n => n !== user.user.username)[0]} e outras ${post.likes.length -1} pessoas`:
                                    post.likes.length === 0? "0 pessoas":
                                    post.likes.length === 1? `${post.likes.map(n => n.username).filter(n => n !== user.user.username)[0]}`:
                                    post.likes.length === 2? `${post.likes.map(n => n.username).filter(n => n !== user.user.username)[0]} e  ${post.likes.map(n => n.username).filter(n => n !== user.user.username)[1]}`:
                                    `${post.likes.map(n => n.username).filter(n => n !== user.user.username)[0]},  ${post.likes.map(n => n.username).filter(n => n !== user.user.username)[1]} e outras ${post.likes.length -2} pessoas`
                                } 
                                    onClick={() => like(post.id)
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
                                </div>
                                <div className='postRight'>
                                <h2 id={post.user.id} onClick={()=>goToUserPosts(post.user.id)}>{post.user.username}</h2>
                                    <PostComment>
                                        <ReactHashtag 
                                            onHashtagClick={(val) => sendToHashtag(val)}
                                            renderHashtag={(hashtagValue) => (
                                                <Hashtag>{hashtagValue}</Hashtag>
                                           )}
                                        >
                                            {post.text}
                                        </ReactHashtag>
                                    </PostComment>
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