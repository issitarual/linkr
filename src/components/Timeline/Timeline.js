import styled from 'styled-components'
import NewPost from './NewPost';
import {useContext, useEffect, useState} from 'react'
import UserContext from '../UserContext';
import axios from 'axios'
import ReactHashtag from "react-hashtag";
import {useHistory} from 'react-router-dom'
import EditAndDelete from './EditAndDelete';

export default function Timeline(){
    const history = useHistory()
    const {user} = useContext(UserContext)
    const [allPosts,setAllPosts] = useState([])
    const [serverLoading,setServerLoading] = useState(true)
    
    const config = {
        headers:{
            'Authorization' : `Bearer ${user.token}`
        }
    }

    function update () {
        const getPosts = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts',config)
        setServerLoading(true)

        getPosts.then((response)=>{
          //  console.log(response)
           // console.log('Os postos foram pegos')
            const newArray = response.data.posts
            setAllPosts(newArray)
            setServerLoading(false)
        })

        getPosts.catch((responseError)=>{
           // console.log(responseError)
            alert(`Houve uma falha ao obter os posts. Por favor atualize a página`)
            return
        })
    }
        useEffect(()=>{
            // console.log(user)
            update();
           
         },[]);
    


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
            <h1>timeline</h1> <button onClick={()=>console.log(allPosts)}>ver se posts foram salvos</button>
                <button onClick={changeLoad}>server load</button>
                <button onClick={()=>console.log(serverLoading)}>server load</button>
                
                <TimelineContent>
                    
                    <TimelinePosts>
                    <NewPost update={update} />

                        {serverLoading 
                            ? <p>Loading</p> 
                            : (allPosts.length===0 
                                ? <p>Nenhum post encontrado</p>
                                :allPosts.map((post)=>{
                            return(

                            <li key={post.id} id={post.id}>
                                <div className='postLeft'>
                                <img src={post.user.avatar} onClick={()=>(history.push(`/user/${post.user.id}`))}/>
                                    <div>coracao</div> {/*icone do coracao* <----------*/}
                                </div>
                                <div className='postRight'>
                                <EditAndDelete post={post} />

                                <h2 id={post.user.id} onClick={()=>(history.push(`/user/${post.user.id}`))}>{post.user.username}</h2>
                                    <p>
                                        <ReactHashtag>
                                            {post.text}
                                        </ReactHashtag>
                                    </p>
                                    
                                    <InputField readOnly  >
                                        {post.text}
                                    </InputField>
                                    
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
  //  border: 1px solid white;
    height: auto;
    min-width: 900px;
    padding-bottom: 300px;
    

    h1{
        color: white;
        margin-bottom: 40px;
       //// border: 1px solid red;
        font-size: 43px;
    }

    .trending{
        background-color: #171717;
        width: 301px;
        height: 406px;
       //// border: 1px solid red;
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
 //
 //border: 1px solid red;
 display: flex;
 flex-direction: column;
 
 
 

    li{
        display: flex;
      //  border: 1px solid green;
        margin-bottom: 10px;
        margin-top:5px;
        min-height:276px;
        height: auto;
        border-radius:16px;
        background-color: #171717;
        color: white;
        width: 610px;
        
        
    }
    .postRight{
        width: 503px;
        //min-height: 230px;
        height: auto;
       //// border: 1px solid blueviolet;

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
       //// border: 1px solid blue;
       display: flex;
       flex-direction: column;
       align-items: center;

       img{
           border-radius:50%;
           width: 50px;
           height: 50px;
         //  border: 1px solid red;
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
width: 503px;
height:155px;
//border: 1px solid blue;
margin: 20px 0;
border-radius: 16px;
display: flex;

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
            //  border: 1px solid red;
            }

            a{
                font-size: 13px;
                width: 263px;
                height: auto;
                color: white;
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

const InputField = styled.textarea`
    width: 502px;
    height: auto;
    resize: none;
    border-radius: 7px;
    background-color: white;
    padding: 5px;
    font-family: Lato;
    font-weight: 400;
    color: #4c4c4c;
    font-size: 14px;   
`;