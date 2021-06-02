import styled from 'styled-components'
import {useContext, useEffect,useState,useRef} from 'react'
import UserContext from '../UserContext';
import axios from 'axios';
import { ConstructOutline, HeartOutline, HeartSharp } from 'react-ionicons';
import Loader from "react-loader-spinner";
import {useHistory} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import ReactHashtag from "react-hashtag";
import TrendingList from './TrendingList';
import InputNewText from './InputNewText';
import ActionsPost from './ActionsPost';

/*import de style components*/
import {PostInfo,LinkDescription,Links,Hashtag,Title,TimelineContainer,
Container,TimelinePosts,TimelineContent,LinkDetails,UserName,NoPostsYet,PostContent} from '../timelineStyledComponents'

/*import dos Posts*/
import Posts from '../Posts'

/*InfiniteScroller*/
import InfiniteScroll from 'react-infinite-scroller';

 

 

export default function MyPosts({goToLink}){
    const history=useHistory()
    const {user} = useContext(UserContext)
    const [myPosts,setMyPosts] = useState([])
   const [serverLoading,setServerLoading] = useState(true)
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


    function partialUpdate(limit){
        
        setTimeout(()=>{
            const getPosts = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${user.user.id}/posts`,config)
        
        getPosts.then((response)=>{
            const newArray = (response.data.posts.map((p)=>({...p, toEdit: false})));
          //  const partial = newArray.slice(0,limit)
           
          const partial =[...myPosts]
         console.log('partial ante do for')
          console.log(partial)

          console.log('newArray na pos limit')
          console.log(newArray[limit])
          
          for(let i = limit; i<limit+10;i++){
                if(i===newArray.length){
                    break;
                }
                  partial.push(newArray[i])
              
          }


          
        console.log('partial depois do for')
          console.log(partial)

          setMyPosts(partial)
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

        },1000)

       maxNumberOfPosts===myPosts.length ? setHasMore(false) : setHasMore(true)
    }

        function update () {
            const getPosts = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${user.user.id}/posts`,config)

        getPosts.then((response)=>{
             const newArray = (response.data.posts.map((m)=>({...m, toEdit: false})));
           
                //
                console.log(response.data)
                setMaxNumberOfPosts(response.data.posts.length)
                
               // const partial = newArray.slice(0,2)
               
                const partial = []
                
                newArray.forEach((post,index)=>{
                   if(index<8){
                       partial.push(post)
                   }
               })
               console.log(partial)
                //
           
             setMyPosts(partial)
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

                    <InfiniteScroll
                        pageStart={0}
                        loadMore={() => partialUpdate( myPosts.length)}
                        hasMore={hasMore}
                        loader={<div className="Scroller mid" key={0}>Loading More Posts..</div>}
                        className='Scroller'
                        threshold={1}
                    >
                   
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

