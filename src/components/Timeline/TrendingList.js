import axios from 'axios';
import {useContext, useEffect, useState} from 'react'
import UserContext from '../UserContext';
import styled from 'styled-components';
import ReactHashtag from "react-hashtag";
import { useHistory } from 'react-router-dom';



export default function TrendingList({send}){
    const [trendings,setTrendings] = useState([])
    const {user} = useContext(UserContext)
    const [hashtagValue,setHashtagValue] = useState('')
    const history = useHistory()

    useEffect(()=>{
        const config = {
            headers:{
                'Authorization' : `Bearer ${user.token}`
            }
        }

        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending',config)

        request.then((response)=>{
            const newArray = response.data.hashtags
            setTrendings(newArray)
        })

        request.catch((responseError)=>{
           
        }) 

    },[])

    function goToHashtagPage(e){
        if(e.code==='Enter'){
            history.push(`/hashtag/${hashtagValue}`)
            setHashtagValue('')
        }
    }


    return (
        <div className='trending'>
            <Title>
                <p>trending</p>
            </Title>

            {trendings.length === 0 ? "" :

                <TrendingsContainer>
                    {trendings.map((trending)=>{
                        return(
                            <li key={trending.id} >
                                <ReactHashtag onHashtagClick={(val) => send(val)}>
                                    {`#${trending.name}`}
                                </ReactHashtag>
                            </li>
                        )
                    })}

                    <SearchHashtag>
                        <input placeholder='Type a hashtag' onChange={(e)=>(setHashtagValue(e.target.value))} onKeyPress={(e)=>goToHashtagPage(e)} value={hashtagValue} />
                    </SearchHashtag>
                    
                </TrendingsContainer>
            }

        </div>
    )
}

const Title = styled.div`
    height: 60px;
    width: 100%;
    color: white;
    border-bottom:1px solid white;
    display: flex;
    align-items: center;

    p{
        font-size: 27px;
        line-height: 40px;
        font-weight: 700;
        font-family: 'Oswald', sans-serif;
        padding-left: 15px;
        letter-spacing: 5px;
    }
`

const TrendingsContainer = styled.ul`
    width: 100%;
    height: 300px;
    padding-left: 15px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    li{
        font-size: 19px;
        font-family: 'Lato', sans-serif;
        font-weight:700;
        line-height: 23px;
        letter-spacing: 3px;
    }

`
const SearchHashtag = styled.div`
    position: relative;

    input{
        width: 269px;
        height: 35px;
        background-color: #252525;
        color: white;
        padding-left: 30px;
        
        
       
    }
`