import styled from 'styled-components';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import ReactHashtag from "react-hashtag";

import UserContext from '../UserContext';

export default function Hashtag(){
    const history = useHistory();
    const {user} = useContext(UserContext);


    const config = {
        headers:{
            'Authorization' : `Bearer ${user.token}`
        }
    }


    // function getHashtags(){
    //     const requestHashtag = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`)
    //     requestHashtag.then(() => console.log("deu bom"))
    //     requestHashtag.catch(() => console.log("deu ruim"))

    // }




    return(
        <>
        <Container>
            <TimelineContainer>
                <h1>#hashtag</h1>

                <TimelinePosts>
                    <li>
                        <div className='postLeft'>
                            <img src="" onClick={()=>(history.push(`/user/`))}/>
                                <div>coracao</div> {/*icone do coracao* <----------*/}
                            </div>
                            <div className='postRight'>
                            <h2 id="" onClick={()=>(history.push(`/user/`))}>Lia</h2>
                                <p>
                                    <ReactHashtag>
                                        kkcry
                                    </ReactHashtag>
                                </p>
                                <LinkDetails>
                                    {/* <div>
                                        <h3>{post.linkTitle}</h3>
                                        
                                        <p className='linkDescription'>{post.linkDescription}</p>
                                        
                                        <a href={post.link} onClick={(e)=>goToLink(e,post.link)}>{post.link}</a>
                                    </div>
                                    <img src={post.linkImage} onClick={(e)=>goToLink(e,post.link)}/> */}
                                </LinkDetails>
                        </div>
                    </li>
                </TimelinePosts>

                <Trending>

                </Trending>


            </TimelineContainer>
        </Container>
        </>
    )
}

const Container = styled.div`
    width: 100%;
    height: auto;
    min-height: 100vh;
    background-color: #333333;
    display: flex;
    justify-content: center;
`;

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
`;

const Trending = styled.div`
    background-color: #171717;
    width: 301px;
    height: 406px;
    position: fixed;
    z-index:2;
    right: 174px;
    top: 226px;
    color: white;
`;

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
`;

const LinkDetails = styled.div`
    width: 503px;
    height:155px;
    margin: 20px 0;
    border-radius: 16px;
    display: flex;
    border: solid 1px white;

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