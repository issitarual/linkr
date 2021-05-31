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



export default function MyPosts(){
    const history=useHistory()
    const {user} = useContext(UserContext)
    const [myPosts,setMyPosts] = useState([])
   const [serverLoading,setServerLoading] = useState(true)
   const [likedPosts, SetLikedPosts] = useState([]);
   const [olderLikes, SetOlderLikes] = useState([]);

   const inputRef = useRef([])
   

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
        console.log(val)
        //const newVal = val.replace('#',"")
       // history.push(`/hashtag/${newVal}`)
    }
   
     return( 
      
    <Container>
        
        <TimelineContainer>
        <Title>my posts</Title> 
                
                <TimelineContent>

                    <TimelinePosts>
                      
                        {serverLoading 
                            ? <Loader type="Circles" className='loader'  color="#FFF" />
                            : (myPosts.length===0 
                                ? <NoPostsYet>Você ainda não postou nada</NoPostsYet>
                                :myPosts.map((post)=>{
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
                                <ActionsPost update={update} post={post} tryingToEdit={tryingToEdit} id={post.id}/>

                                <UserName id={post.user.id}>{post.user.username}</UserName>
                                <PostContent open={!post.toEdit} >
                                        <ReactHashtag 
                                            
                                            renderHashtag={(hashtagValue) => (
                                                 <Hashtag onClick={()=>history.push(`/hashtag/${hashtagValue.replace('#',"")}`)} >{hashtagValue}</Hashtag>
                                            )}
                                            //onHashtagClick={(val) => sendToHashtag(val)}
                                        >
                                            {post.text}
                                        </ReactHashtag>
                                </PostContent>    
                                    <InputNewText update={update} id={post.id} tryingToEdit={tryingToEdit} post={post} config={config} toEdit={post.toEdit} inputRef={inputRef}/>

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

// const Container = styled.div`
//     font-family: Lato;
//     width: 100%;
//     height: auto;
//     min-height: 100vh;
//     background-color: #333333;
//     display: flex;
//     justify-content: center;
// `;

// const TimelineContainer = styled.div`
//     margin-top: 125px;
//     width: 1000px;
//     height: auto;
//     padding-bottom: 30px;
    
//     @media (max-width:1200px){
//         width: 100%;
//         display: flex;
//         flex-direction: column;
//     }

//     h1{
//         color: white;
//         margin-bottom: 40px;
//         font-size: 43px;
//         font-family: 'Oswald', sans-serif !important;
//         font-weight: bold;
//         @media (max-width:1200px){
//             margin: 10px auto;
//         }
        
//     }
//     .trending{
//         background-color: #171717;
//         width: 301px;
//         height: 406px;
//         position: fixed;
//         z-index:0;
//         right: 174px;
//         top: 226px;
//         color: white;
//         border-radius: 16px;
//         @media (max-width: 1200px){
//             display: none;
    
//         }
//     }
// `;
// const TimelinePosts = styled.ul`
//     width: auto;
//     height: auto;
//     display: flex;
//     flex-direction: column;
    
 
//     @media (max-width:610px){
//         align-items: center;
//         width: 100%;
//         min-width:360px;
//     }

//     svg{
//         margin: 40px 180px;
//     }

//     li{
//         display: flex;       
//         margin-top:10px;
//         min-height:276px;
//         height: auto;
//         border-radius:16px;
//         background-color: #171717;
//         color: white;
//         width: 610px;

//         @media (max-width:610px){
//             width: 90%;
//         }
//     }

//     .postRight{
//         width: 503px;
//         height: auto;

//        @media (max-width:1200px){
//            width: 80%;
//        }

//        h2{
//             font-family: 'Lato', sans-serif!important;
//            font-size: 19px;
//            color: #fff;
//            margin: 20px 20px 7px 20px;
//        }

//        .postText{
//            width: 502px;
//            height: auto;
//            margin-left: 20px;
//            color: #a3a3a3;
//            font-family: 'Lato', sans-serif!important;
//            font-size: 17px;

//            @media (max-width:1200px){
//                 width: 20%;
//             }
//         }
//     }

//     .postLeft{
//         width: 87px;
//         min-height: 230px;
//         height: auto;
//         display: flex;
//         flex-direction: column;
//         align-items: center;

//         @media (max-width:1200px){
//            width: 20%;
//        }

//        img{
//            border-radius:50%;
//            width: 50px;
//            height: 50px;
//            margin-top: 20px;
//        }
//        h6{
//         font-family: 'Lato', sans-serif!important;
//         font-size: 11px;
//         margin-top: 10px;
//        }
//        .ion-icon{
//            margin-top: -30px;
//            height: 60px;
//        }
//     }
// `;

// const TimelineContent= styled.div`
//     display: flex;
//     justify-content:  space-between;
//     height: auto;

//     @media (max-width: 1200px){
//         justify-content: center;
//     }  
// `;

// const LinkDetails = styled.div`
//     width: 503px;
//     height:155px;
//     border: 1px solid #4D4D4D;
//     margin: 20px 0;
//     border-radius: 16px;
//     display: flex;
//     color: #CECECE;

//     @media (max-width:1200px){
//         width: 95%;
//     }

//     img{
//         width: 153px;
//         height: 155px;
//         border-radius: 0px 12px 13px 0px;
    
//         @media (max-width:1200px){
//             width: 30%;
//         }
//     }

//     img:hover{
//         cursor: pointer;
//     }

   
// `;



// const Title = styled.h1`
//     font-family: Oswald;
//     font-style: normal;
//     font-weight: 700;
//     font-size: 43px;
//     line-height: 64px;
//     color: white;
// `;

// const UserName = styled.p`
//     font-style: normal;
//     font-weight: normal;
//     font-size: 19px;
//     line-height: 23px;
//     color: white;
//     margin-top: 19px;
// `;

// const PostContent = styled.p`
//     font-style: normal;
//     font-weight: normal;
//     font-size: 17px;
//     line-height: 20px;
//     margin-top: 10px;
//     color: #B7B7B7;
//     display: ${(props) => (props.open) ? 'initial' : 'none'};
//     width: 90%;
//     word-wrap: break-word;
//     white-space: pre-wrap;

// `;

// const NoPostsYet = styled.p`
//     font-size: 30px;
//     color: white;
//     margin-top: 20px;
// `;
