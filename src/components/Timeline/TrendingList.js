import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import { CogSharp, TrendingUpSharp } from 'react-ionicons';
import UserContext from '../UserContext';
import styled from 'styled-components'
import ReactHashtag from "react-hashtag";


export default function TrendingList({send}){
    const [trendings,setTrendings] = useState([])

    const {user} = useContext(UserContext)

useEffect(()=>{
    const config = {
        headers:{
            'Authorization' : `Bearer ${user.token}`
        }
    }
    const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending',config)

    request.then((response)=>{
        console.log(response)
        console.log('trendingds recuperadas')
        const newArray = response.data.hashtags
        setTrendings(newArray)

    })


    request.catch((responseError)=>{
        console.log(responseError)
        console.log('erro ao obter trendings')

    })
},[])


    return (
        <div className='trending'>
            <Title>
            <button onClick={()=>console.log(trendings)}>ver se trends foram salvos</button>
            <p>trending</p>
            </Title>

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
            </TrendingsContainer>


            
        </div>
    )
}

const Title = styled.div`
    height: 60px;
    width: 100%;
    color: white;
    border-bottom:1px solid white;

    p{
        font-size: 27px;
    }
`

const TrendingsContainer = styled.ul`
    width: 100%;

`
