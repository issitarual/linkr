import styled from 'styled-components'
import {useContext, useEffect,useState} from 'react'
import UserContext from '../UserContext';
import axios from 'axios'
import ReactHashtag from "react-hashtag";
import {useParams} from 'react-router-dom'

export default function OtherUsersPosts(){
     const {id} = useParams()
    const {user} = useContext(UserContext)
    const [posts,setPosts] = useState([])
   const [serverLoading,setServerLoading] = useState(true)
   const [pageUser,setPageUser] = useState(null)

    useEffect(()=>{
        const config = {
            headers:{
                'Authorization' : `Bearer ${user.token}`
            }
        } 

        const getPosts = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`,config)

        getPosts.then((response)=>{
          const newArray = response.data.posts
           setPosts(newArray)
          setPageUser(response.data.posts[0].user.username)
           setServerLoading(false) 

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
   
    return( 
      
    <Container>
        
        <TimelineContainer>
            <Title>{ !serverLoading 
            ? `${pageUser}'s posts`  
            :'Other Posts'}</Title> 
                
                <TimelineContent>

                    <TimelinePosts>
                       

                        {serverLoading 
                            ? <p>Loading</p> 
                            : (posts.length===0 
                                ? <p>Você ainda não postou nada</p>
                                :posts.map((post)=>{
                            return(
                            <li key={post.id} id={post.id}>
                                <div className='postLeft'>
                                <img src={post.user.avatar}/>
                                    <div>coracao</div> {/*icone do coracao*/}
                                </div>
                                <div className='postRight'>
                                <UserName id={post.user.id}>{post.user.username}</UserName>
                                    <p>
                                        <ReactHashtag>
                                            {post.text}
                                        </ReactHashtag>
                                    </p>
                                    <LinkDetails>
                                        <div>
                                            <h3>{post.linkTitle}</h3>
                                            
                                            <PostContent className='linkDescription'>{post.linkDescription}</PostContent>
                                           
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
                    </div> {/* add o trendin aqui*/}
                </TimelineContent>
        </TimelineContainer>

    </Container>
    )
}

const Container = styled.div`
    font-family: Lato;
    width: 100%;
    height: auto;
    min-height: 100vh;
    background-color: #333333;
    display: flex;
    justify-content: center;
`

const TimelineContainer = styled.div`
    margin-top: 125px;
    width: 1000px;
    height: auto;
    min-width: 900px;
    padding-bottom: 300px;
    h1{
        color: white;
        margin-bottom: 40px;
        font-size: 43px;
    }
    .trending{
        background-color: #171717;
        width: 301px;
        height: 406px;
        position: fixed;
        z-index:2;
        right: 174px;
        top: 226px;
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
        margin-top:15px;
        min-height:276px;
        height: auto;
        border-radius:16px;
        background-color: #171717;
        color: white;
        width: 610px;
    }
    .postRight{
        width: 503px;
        height: auto;
       h2{
           margin: 20px 0;
       }
       p{
           width: 502px;
           height: auto;
       }
    }

    .postLeft{
        width: 87px;
        min-height: 230px;
        height: auto;
       display: flex;
       flex-direction: column;
       align-items: center;
       img{
           border-radius:50%;
           width: 50px;
           height: 50px;
           margin-top: 20px;
       }
    }

`

const TimelineContent= styled.div`
    display: flex;
    justify-content:  space-between;
    height: auto;
 
`

const LinkDetails = styled.div`
    width: 503px;
    height:auto;
    border: 1px solid #4d4d4d;
    margin: 20px 0;
    border-radius: 16px;
    display: flex;
    color: #CECECE;

    div{
        width: 350px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding-left:20px;
        h3{
            width: 250px;
            min-height: 38px;
            height: auto;
            font-size: 20px;
        }
        .linkDescription{
            width: 302px;
            min-height: 40px;
            height: auto;
            font-size: 11px;
        }
        a {
            font-size: 13px;
            width: 263px;
            height: auto;
            color: white;
            white-space: pre-wrap; 
            word-wrap: break-word; 
            
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