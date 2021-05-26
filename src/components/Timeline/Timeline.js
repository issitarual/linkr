import styled from 'styled-components';
import axios from 'axios';

import { HeartOutline } from 'react-ionicons';
import { HeartSharp } from 'react-ionicons';
import { useState, useContext } from 'react';

import UserContext from '../UserContext';

export default function Timeline(){
    const [likedPosts, SetLikedPosts] = useState([]);
    const { user } = useContext(UserContext);

     return( 
      
    <Container>
        
        <TimelineContainer>
            <h1>timeline</h1>
                
                <TimelineContent>

                    <TimelinePosts>
                        <li>
                            <div className='postLeft'>
                                <img src='x'/>
                                <div onClick={() => like("id")}>
                                    {likedPosts.includes("id")?
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


                                </div> 

                            </div>
                            <div className='postRight'>
                                <h2>Nome da pessoa</h2>
                                <p>Muito maneiro esse tutorial de Material UI 
                                    com React, deem uma olhada! #react 
                                    #material</p>
                                <LinkDetails>
                                    <div>
                                        <h3>Como aplicar o Material UI em um 
                                            projeto React</h3>
                                        
                                        <p className='linkDescription'>Hey! I have moved this tutorial to my personal blog. 
                                            Same content, new location. 
                                            Sorry about making you click through to another page.</p>
                                       
                                        <a href='#'>https://medium.com/@pshrmn/a-simple-react-router</a>
                                    </div>
                                    <img/>
                                </LinkDetails>

                            </div>
                        </li>

                        <li>
                            <div className='postLeft'></div>
                            <div className='postRight'></div>
                        </li>
                    </TimelinePosts>
                    
                    <div className = 'trending'>
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
        if(likedPosts.includes(id)){
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`, {}, config)
            request.then(success => likedPosts.filter( (n,i) => n !== id));
            request.catch(error => alert ("Ocorreu um erro, tente novamente."))
        }
        else{
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/dislike`, {}, config)
            request.then(success => SetLikedPosts([...likedPosts, id]));
            request.catch(error => alert ("Ocorreu um erro, tente novamente."))
        }
    }
}

const Container = styled.div`

    width: 100%;
    height: 800px;
    background-color: #E5E5E5;

    
    display: flex;
    justify-content: center;
`

const TimelineContainer = styled.div`
    margin-top: 160px;
    width: 1000px;
   border: 1px solid white;
    height: 800px;
    min-width: 900px;

    h1{
        color: white;
        margin-bottom: 40px;
        border: 1px solid red;
    }

    .trending{
        background-color: #171717;
        width: 301px;
        height: 406px;
        border: 1px solid red;
    }

`

const TimelinePosts = styled.ul`
 width: auto;
 height: auto;
 
 border: 1px solid red;
 display: flex;
 flex-direction: column;
 
 
 

    li{
        display: flex;
        border: 1px solid green;
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
        min-height: 230px;
        height: auto;
       // border: 1px solid blueviolet;

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
       // border: 1px solid blue;
       display: flex;
       flex-direction: column;
       align-items: center;

       img{
           border-radius:50%;
           width: 50px;
           height: 50px;
           border: 1px solid red;
           margin-top: 20px;
       }
    }

    

`


const TimelineContent= styled.div`
display: flex;
justify-content:  space-between;
 
`

const LinkDetails = styled.div`
width: 503px;
height:155px;
border: 1px solid blue;
margin: 20px 0;
border-radius: 16px;
display: flex;

    div{
        width: 330px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding-left:20px;

        h3{
            width: 250px;
            height: 38px;
            font-size: 20px;
        }

        .linkDescription{
            width: 302px;
            height: 40px;
            font-size: 11px;
            border: 1px solid red;
        }

        a{
            font-size: 11px;
            width: 263px;
            height: 13px;
        }
    }

img{
        width: 153px;
        height: 155px;
        border-radius: 0px 12px 13px 0px;
    }
`