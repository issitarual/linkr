import styled from 'styled-components';
import {useContext, useEffect,useState} from 'react';
import UserContext from '../UserContext';
import axios from 'axios';
import ReactHashtag from "react-hashtag";
import {useHistory} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import { HeartOutline, HeartSharp } from 'react-ionicons';

export default function MyLikes(){
    const history = useHistory()
    const [likedPosts, SetLikedPosts] = useState([]);
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
                    sharpedHeart.push({id: post.id, likes: post.likes.length})
                })
            SetLikedPosts(sharpedHeart)})

        getPosts.catch((responseError)=>{
           // console.log(responseError)
            alert(`Houve uma falha ao obter os posts. Por favor atualize a página`)
            return
        })
    },[])

    function goToLink(e,link){
        e.preventDefault()
        console.log(`ir para o link: ${link}`)
       window.open(link)
    }

    function changeLoad(){
        setServerLoading(!serverLoading)
        
    }
    return( 
      
    <Container>
        
        <TimelineContainer>
            <h1>my likes</h1> 
                
                <TimelineContent>

                    <TimelinePosts>

                        {serverLoading 
                            ? <p>Loading</p> 
                            : (allPosts.length===0 
                                ? <p>Nenhum post encontrado</p>
                                :allPosts.map((post)=>{

                            return(
                            <li key={post.id} id={post.id}>
                                <div className='postLeft'>
                                <img src={post.user.avatar} onClick={()=>(history.push(`/user/${post.user.id}`))}/>
                                <div className ="ion-icon" data-tip={post.likes.length === 0? "0 pessoas": likedPosts.map(n => n.id).includes(post.id)? `Você e outras ${likedPosts.filter(n => n.id === post.id)[0].likes} pessoas`:`${post.likes.length} pessoas`} onClick={() => like(post.id)}>
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
                                    {likedPosts.map(n => n.id).includes(post.id)? post.likes.length + 1:post.likes.length} likes
                                </h6>
                                </div>
                                <div className='postRight'>
                                <h2 id={post.user.id} onClick={()=>(history.push(`/user/${post.user.id}`))}>{post.user.username}</h2>
                                    <p>
                                        <ReactHashtag>
                                            {post.text}
                                        </ReactHashtag>
                                    </p>
                                    <LinkDetails>
                                        <div>
                                            <h3>{post.linkTitle}</h3>
                                            
                                            <p className='linkDescription'>{post.linkDescription}</p>
                                           
                                            <a href={post.link} onClick={(e)=>goToLink(e,post.link)}>{post.link}</a>
                                        </div>
                                        <img src={post.linkImage} onClick={(e)=>goToLink(e,post.link)}/>
                                    </LinkDetails>
                                </div>
                            </li>   
                            )
                        })
                            )
                        }

                      
                    </TimelinePosts>
                    
                    <div className = 'trending'>
                        'lista de hashtag'
                    </div> {/* add o trendin aqui*/}
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
                SetLikedPosts(likedPosts.filter( (n,i) => n.id !== id))
                console.log(success);
            });
            request.catch(error => alert ("Ocorreu um erro, tente novamente."))
        }
        else{
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`, {}, config)
            request.then(success => {
                SetLikedPosts([...likedPosts, {id: id, likes: success.data.post.likes.length}])
                console.log(success);
            });
            request.catch(error => alert ("Ocorreu um erro, tente novamente."))
        }
    }
}

const Container = styled.div`

    width: 100%;
    height: auto;
    min-height: 100vh;
    
    background-color: #333333;
    
    
    display: flex;
    justify-content: center;

`

const TimelineContainer = styled.div`
    margin-top: 125px;
    width: 70%;
    height: auto;
    padding-bottom: 50px;
    

    h1{
        color: #fff;
        margin-bottom: 40px;
        font-size: 43px;
        font-family: 'Oswald', sans-serif;
        font-weight: bold;
    }

    .trending{
        background-color: #171717;
        width: 301px;
        height: 406px;
        position: fixed;
        z-index:2;
        right: calc(50% - 500px);
        top: 213px;
        color: white;
    }

`

const TimelinePosts = styled.ul`
 width: auto;
 height: auto;
 display: flex;
 flex-direction: column;
 
    li{
        display: flex;
        margin-bottom: 10px;
        margin-top:5px;
        min-height:276px;
        height: auto;
        border-radius:16px;
        background-color: #171717;
        color: white;
        width: 70%;      
        padding: 20px;
    }
    .postRight{
        width: 100%;
        height: auto;

       h2{
           font-family: 'Lato', sans-serif!important;
           font-size: 19px;
           color: #fff;

       }

       p{
           color: #a3a3a3;
           font-family: 'Lato', sans-serif!important;
            font-size: 17px;
            margin-top: 5px;
       }
    }

    .postLeft{
        width: 10%;
        min-height: 230px;
        height: auto;
       display: flex;
       flex-direction: column;
       align-items: center;
       margin-right: 10px;
       img{
           border-radius:50%;
           width: 50px;
           height: 50px;

       }
       h6{
        font-family: 'Lato', sans-serif!important;
        font-size: 11px;
        margin-top: 5px;
       }
       .ion-icon{
           margin-top: 20px;
       }
    }

    

`


const TimelineContent= styled.div`
display: flex;
justify-content:  space-between;

height: auto;
//border: 2px solid yellow;
 
`

const LinkDetails = styled.div`
width: 95%;
border: 1px solid #4D4D4D;
margin: 20px 0 0 0 ;
border-radius: 11px;
display: flex;

    div{
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding: 10px;
            h3{
                height: auto;
                font-size: 20px;
                color: #cecece;
                font-family: 'Lato', sans-serif!important;
                font-size: 16px;
            }

            .linkDescription{
                height: auto;
                font-size: 11px;
                font-family: 'Lato', sans-serif!important;
                color: #9B9595;
            }

            a{
                font-size: 11px;
                width: 263px;
                height: auto;
                color: #cecece;
                font-family: 'Lato', sans-serif!important;

                white-space: pre-wrap; /* CSS3 */    
   
                 word-wrap: break-word; /* Internet Explorer 5.5+ */
                
            }
            a:hover{
                color: blue;
                text-decoration: underline;
                cursor: pointer;
            }
            
    }

    img{
            width: 153px;
            height: 155px;
            border-radius: 0px 12px 13px 0px;
        }

    img:hover{
        cursor: pointer;
    }
`