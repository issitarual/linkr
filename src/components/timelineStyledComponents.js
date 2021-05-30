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

export {PostInfo}
export{LinkDescription}
export{Links}
export{Hashtag}