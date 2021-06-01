import styled from 'styled-components';
import { LocationOutline } from 'react-ionicons'


export default function Location () {

    return(

        <PinIcon>
            <LocationOutline
                color={'#fff'} 
                height="40px"
                width="40px"
            />
        </PinIcon>

    );
}

const PinIcon = styled.div`


`;