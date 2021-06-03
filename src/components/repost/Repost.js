import {useState } from 'react';
import {RepeatOutline} from 'react-ionicons';
import RepostModal from './RepostModal';

export default function Repost ({id, count, update}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function toggleModal () {
        setModalIsOpen(!modalIsOpen);
    }

    return (
        <>
            <div className = "ion-icon">
                <RepeatOutline
                    color={'#ffffff'}
                    height="25px"
                    width="25px"
                    onClick = {() => toggleModal()}
                />
            </div>
            
            <RepostModal
            update={update}
            modalIsOpen={modalIsOpen}
            toggleModal={toggleModal}
            id={id}
            />
            <h6>{count} re-post</h6>
        </>           
    );
}
