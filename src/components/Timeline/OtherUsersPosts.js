import {useContext, useEffect,useState,useRef} from 'react';
import UserContext from '../UserContext';
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';
import TrendingList from '../hashtag/TrendingList';
import styled from 'styled-components';

/*import de style components*/
import {Title,TimelineContainer,Container,TimelineContent} from '../timelineStyledComponents'
    
/*import dos Posts*/
import Posts from '../Posts'


export default function OtherUsersPosts(){
    const {id} = useParams();
    const {user} = useContext(UserContext);
    const [usersPosts,setUsersPosts] = useState([]);
    const [serverLoading,setServerLoading] = useState(true);
    const [pageUser,setPageUser] = useState(null);
    const [userImage, setUserImage] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [olderLikes, setOlderLikes] = useState([]);
    const inputRef = useRef([]);
    const history=useHistory();

    const [disabFollow, setDisabFollow] = useState(false);
    const [followingUsers, setFollowingUsers] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)


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
            setUserImage(response.data.posts[0].user.avatar)
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


    useEffect(() => {
        getFollowingList()

    },[])

    useEffect(() => {
        const peopleIFollow = followingUsers && followingUsers.filter((user) => user.username === pageUser);
        peopleIFollow.length > 0 ? setIsFollowing(true) : setIsFollowing(false);
    }, [followingUsers])

    function getFollowingList(){
        const getFollowing = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows", config)
        getFollowing.then((response) => {console.log(response.data.users); setFollowingUsers(response.data.users)})
        getFollowing.catch(() => console.log("deu ruim no get"))
    }

    function goToLink(e,link){
        e.preventDefault()
        window.open(link)
    }  

    function sendToHashtag(val){
        const newVal = val.replace('#',"")
        history.push(`/hashtag/${newVal}`)
    }


    function follow(){
        const requestToFollow = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/follow`, {}, config)
        requestToFollow.then((response) => {console.log(response.data); setDisabFollow(false); getFollowingList()});
        requestToFollow.catch(()=> alert("Não foi possivel executar essa operação"));
    }

    function unfollow(){
        const requestToUnfollow = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/unfollow`, {}, config)
        requestToUnfollow.then((response) => {console.log(response.data); setDisabFollow(false); getFollowingList()});
        requestToUnfollow.catch(()=> alert("Não foi possivel executar essa operação"));
    }

    function ifFollowing(){
        setDisabFollow(true);
        if(!isFollowing)
            follow() 
        else 
            unfollow()

    }
    
    return( 
      
        <Container>
            <TimelineContainer>
                <Title>
                    <img src={userImage}/> 
                    <h1>{ !serverLoading 
                        ? `${pageUser}'s posts`  
                        :'Other Posts'}
                    </h1>
                    <Follow onClick={ifFollowing} disabled={disabFollow} following={isFollowing}>
                        <p>{!isFollowing ? "Follow" : "Unfollow"}</p>
                    </Follow>
                </Title> 
                
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


const Follow = styled.button`
    width: 112px;
    height: 30px;
    background: ${props => (!props.following ? "#1877F2" : "white" )};
    color: ${props => (props.following ? "#1877F2" : "white" )};
    border-radius: 5px;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 700; 
    margin-left: 950px;
    position: absolute;

    @media (max-width:800px){
        margin-left: 500px;
    }

`;
