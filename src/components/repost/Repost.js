import {useState } from 'react';
import {RepeatOutline} from 'react-ionicons';
import RepostModal from './RepostModal';
import styled from 'styled-components';

export default function Repost ({id, count}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function toggleModal () {
        setModalIsOpen(!modalIsOpen);
    }

    return (
        <>
            <ContainerIcon>
                <RepeatOutline
                    color={'#ffffff'}
                    height="25px"
                    width="25px"
                    style={{
                        cursor: "pointer",
                        margin: "0",
                        position: 'absolute',
                        bottom: '0px',
                        left: '0px',
                        zIndex: "0"
                    }}
                    onClick = {() => toggleModal()}
                />
            </ContainerIcon>
            
            <RepostModal
            modalIsOpen={modalIsOpen}
            toggleModal={toggleModal}
            id={id}
            />
            <h6>{count} re-post</h6>
        </>           
    );
}

const ContainerIcon = styled.div`
    margin-top: 10px;
    padding: 0px!important;
    width: 25px;
    height: 25px;
    position: relative;
`;