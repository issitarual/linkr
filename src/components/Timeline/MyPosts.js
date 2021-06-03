import {useContext, useEffect,useState,useRef} from 'react'
import UserContext from '../UserContext';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import TrendingList from '../hashtag/TrendingList';


/*import de style components*/
import {Title,TimelineContainer,Container,TimelineContent} from '../timelineStyledComponents'

/*import dos Posts*/
import Posts from '../Posts'

/*InfiniteScroller*/
import InfiniteScroll from 'react-infinite-scroller';

 

 

export default function MyPosts({goToLink}){
    const history=useHistory()
    const {user} = useContext(UserContext)
    const [myPosts,setMyPosts] = useState([])
    const [serverLoading,setServerLoading] = useState(true);
    const [likedPosts, setLikedPosts] = useState([]);
    const [olderLikes, setOlderLikes] = useState([]);

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
        update();
    },[])


  
        function update () {
            const getPosts = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${user.user.id}/posts`,config)

        getPosts.then((response)=>{
             const newArray = (response.data.posts.map((m)=>({...m, toEdit: false})));
             setMyPosts(newArray)
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

    function tryingToEdit(id,canCallRef) {
        let postsToEdit = myPosts.map((p) => {
            if(p.id === id){
                p.toEdit = !p.toEdit;
               
            }
            return {...p};
        })   
        setMyPosts([...postsToEdit]);

       
        setTimeout(()=>{

            inputRef.current[id].focus()
        },100) 
    
    }

    

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
   
    return( 
      
    <Container>
        
        <TimelineContainer>
        <Title>my posts</Title> 
                
                <TimelineContent>

                   
                        <Posts noPostsMessage={'Você ainda não postou nada'}
                            update={update}
                            serverLoading={serverLoading}
                            allPosts={myPosts}
                            goToUserPosts={goToUserPosts}
                            olderLikes={olderLikes}
                            likedPosts={likedPosts}
                            user={user}
                            like={like}
                            tryingToEdit={tryingToEdit}
                            config={config}
                            inputRef={inputRef}
                            goToLink={goToLink}
                            sendToHashtag={sendToHashtag}

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