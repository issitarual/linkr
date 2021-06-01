import {useContext, useEffect,useState,useRef} from 'react'
import UserContext from '../UserContext';
import axios from 'axios'
import {useParams, useHistory} from 'react-router-dom'
import TrendingList from '../hashtag/TrendingList';


/*import de style components*/
import {Title,TimelineContainer,Container,TimelineContent,} from '../timelineStyledComponents'
    
/*import dos Posts*/
import Posts from '../Posts'


export default function OtherUsersPosts(){
    const {id} = useParams();
    const {user} = useContext(UserContext);
    const [usersPosts,setUsersPosts] = useState([]);
    const [serverLoading,setServerLoading] = useState(true);
    const [pageUser,setPageUser] = useState(null);
    const [likedPosts, SetLikedPosts] = useState([]);
    const [olderLikes, SetOlderLikes] = useState([]);
    const inputRef = useRef([]);
    const history=useHistory();


    const config = {
        headers:{
            'Authorization' : `Bearer ${user.token}`
        }
    }

    useEffect(()=>{
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
    
    return( 
      
    <Container>
        
        <TimelineContainer>
            <Title>{ !serverLoading 
            ? `${pageUser}'s posts`  
            :'Other Posts'}</Title> 
                
                <TimelineContent>

                
                    <Posts noPostsMessage={'Este usuário não postou nada'}
                        serverLoading={serverLoading}
                        allPosts={usersPosts}
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