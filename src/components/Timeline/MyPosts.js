import styled from 'styled-components'
import {useContext, useEffect,useState} from 'react'
import UserContext from '../UserContext';
import axios from 'axios'
import ReactHashtag from "react-hashtag";
import Loader from "react-loader-spinner";
import {useHistory} from 'react-router-dom'
import TrendingList from './TrendingList';

export default function MyPosts(){
    const history=useHistory()
    const {user} = useContext(UserContext)
    const [myPosts,setMyPosts] = useState([])
    const [serverLoading,setServerLoading] = useState(true)

    useEffect(()=>{
        console.log(user)
        const config = {
            headers:{
                'Authorization' : `Bearer ${user.token}`
            }
        } 

        const getPosts = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${user.user.id}/posts`,config)

        getPosts.then((response)=>{
            const newArray = response.data.posts
            setMyPosts(newArray)
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

    function sendToHashtag(val){
        const newVal = val.replace('#',"")
        history.push(`/hashtag/${newVal}`)
    }
   
    return( 
      
    <Container>
        
        <TimelineContainer>
            <h1>My Posts</h1> 
                
                <TimelineContent>

                    <TimelinePosts>
                      
                        {serverLoading 
                            ? <Loader type="Circles" color="#00BFFF" height={200} width={200} />
                            : (myPosts.length===0 
                                ? <NoPostsYet>Você ainda não postou nada</NoPostsYet>
                                :myPosts.map((post)=>{
                            return(
                            <li key={post.id} id={post.id}>
                                <div className='postLeft'>
                                    <img src={post.user.avatar}/>
                                    <div>coracao</div> {/*icone do coracao*/}
                                </div>

                                <div className='postRight'>
                                    <h2 id={post.user.id}>{post.user.username}</h2>
                                    <p>
                                        <ReactHashtag onHashtagClick={(val) => sendToHashtag(val)}>
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
                    
                    <TrendingList send={sendToHashtag} /> 

                </TimelineContent>
        </TimelineContainer>

    </Container>
    )
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
    width: 1000px;
    height: auto;
    padding-bottom: 300px;
    
    @media (max-width:1200px){
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    h1{
        color: white;
        margin-bottom: 40px;
        font-size: 43px;

        @media (max-width:1200px){
            margin: 10px auto;
        }
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
        
        @media (max-width: 1200px){
            display: none;
    
        }
    }

`

const TimelinePosts = styled.ul`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
   
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
            width: 100%;
        }
    }

    .postRight{
        width: 503px;
        height: auto;

       h2{
           margin: 20px 20px;
       }

       .postText{
           width: 502px;
           height: auto;
           margin-left: 20px;
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

    @media (max-width: 1200px){
        justify-content: center;
    }
`

const LinkDetails = styled.div`
    width: 503px;
    height:155px;
    margin: 20px 0;
    border-radius: 16px;
    display: flex;

    @media (max-width:1200px){
        width: 100%;
    }

    div{
        width: 350px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding-left:20px;
        
        @media (max-width:1200px){
            width: 70%;
        }

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

        a{
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
    
        @media (max-width:1200px){
        width: 30%;
        }
    }

    img:hover{
        cursor: pointer;
    }
`

const NoPostsYet = styled.p`
    font-size: 30px;
    color: white;
    margin-top: 20px;

`
