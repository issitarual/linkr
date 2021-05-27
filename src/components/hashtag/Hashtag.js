import styled from 'styled-components'
// import {useContext, useEffect, useState} from 'react'
// import axios from 'axios'
// import {useHistory} from 'react-router-dom';

// import UserContext from '../UserContext';



export default function Hashtag(){
    return(
        <>
        <Container>
            <TimelineContainer>

                <TimelinePosts>
                    <li>auhsuah</li>
                    <li>auhsuah</li>
                    <li>auhsuah</li>
                    

                </TimelinePosts>


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

`

const TimelineContainer = styled.div`
    margin-top: 125px;
    width: 1000px;
    height: auto;
    min-width: 900px;
    padding-bottom: 300px;
    

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
        width: 610px;
        
        
    }
    

`