import styled from 'styled-components'

 const PostInfo = styled.div`
     
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
                color: #cecece;
                font-weight: bold;
                font-family: 'Lato', sans-serif!important;
                font-size: 16px;

                @media (max-width:1200px){
                width: 90%;
                 }  
                 @media (max-width:800px){
                     font-size: 10px;
                 } 
            

            }
    
    
`;



 const LinkDescription = styled.p`
                width: 302px;
                min-height: 40px;
                height: auto;
                font-size: 11px;
                font-family: 'Lato', sans-serif!important;
                color: #9B9595;
                overflow-y:hidden;

                @media (max-width:1200px){
                width: 90%;
                 }   
`

const Links = styled.a`
        font-size: 13px;
            width: 80%;
            height: auto;
            color: blue;
            white-space: pre-wrap ;  
            word-wrap: break-word; 
            overflow-y: hidden;

            @media (max-width:1200px){
            width: 90%;
            }
        
        
        a:hover{
            color: blue;
            text-decoration: underline;
            cursor: pointer;
        }           
`

 
const Hashtag = styled.span`
    color: white;
    font-weight: bold;
`;

const PostComment = styled.p`
    width: 90%;
    word-wrap: break-word;
    white-space: pre-wrap;

`
const Title = styled.h1`
    font-family: Oswald;
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: white;
`;

const TimelineContainer = styled.div`
    margin-top: 125px;
    width: 1000px;
    height: auto;
    padding-bottom: 30px;
    
    @media (max-width:1200px){
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    h1{
        color: white;
        margin-bottom: 40px;
        font-size: 43px;
        font-family: 'Oswald', sans-serif !important;
        font-weight: bold;
        @media (max-width:1200px){
            margin: 10px auto;
        }
        
    }
    .trending{
        background-color: #171717;
        width: 301px;
        height: 406px;
        position: fixed;
        z-index:0;
        right: 174px;
        top: 226px;
        color: white;
        border-radius: 16px;
        @media (max-width: 1200px){
            display: none;
    
        }
    }
`;


const Container = styled.div`
    font-family: Lato;
    width: 100%;
    height: auto;
    min-height: 100vh;
    background-color: #333333;
    display: flex;
    justify-content: center;
`;

const TimelinePosts = styled.ul`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    
 
    @media (max-width:610px){
        align-items: center;
        width: 100%;
        min-width:360px;
    }

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
            width: 90%;
        }
    }

    .postRight{
        width: 503px;
        height: auto;

       @media (max-width:1200px){
           width: 80%;
       }

       h2{
            font-family: 'Lato', sans-serif!important;
           font-size: 19px;
           color: #fff;
           margin: 20px 20px 7px 20px;
       }

       .postText{
           width: 502px;
           height: auto;
           margin-left: 20px;
           color: #a3a3a3;
           font-family: 'Lato', sans-serif!important;
           font-size: 17px;

           @media (max-width:1200px){
                width: 20%;
            }
        }
    }

    .postLeft{
        width: 87px;
        min-height: 230px;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        @media (max-width:1200px){
           width: 20%;
       }

       img{
           border-radius:50%;
           width: 50px;
           height: 50px;
           margin-top: 20px;
       }
       h6{
        font-family: 'Lato', sans-serif!important;
        font-size: 11px;
        margin-top: 10px;
       }
       .ion-icon{
           margin-top: -30px;
           height: 60px;
       }
    }
`;

const TimelineContent= styled.div`
    display: flex;
    justify-content:  space-between;
    height: auto;

    @media (max-width: 1200px){
        justify-content: center;
    }  
`;

const LinkDetails = styled.div`
    width: 503px;
    height:155px;
    border: 1px solid #4D4D4D;
    margin: 20px 0;
    border-radius: 16px;
    display: flex;
    color: #CECECE;

    @media (max-width:1200px){
        width: 95%;
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
    display: ${(props) => (props.open) ? 'initial' : 'none'};
    width: 90%;
    word-wrap: break-word;
    white-space: pre-wrap;
    

`;

const NoPostsYet = styled.p`
    font-size: 30px;
    color: white;
    margin-top: 20px;
`;

export{PostInfo}
export{LinkDescription}
export{Links}
export{Hashtag}
export{PostComment,Title,TimelineContainer,Container,TimelinePosts,TimelineContent,LinkDetails,UserName,PostContent,NoPostsYet}