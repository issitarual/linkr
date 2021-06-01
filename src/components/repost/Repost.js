import UserContext from '../UserContext';
import {useContext, useState } from 'react';
import {RepeatOutline} from 'react-ionicons';
import RepostModal from './RepostModal';

export default function Repost ({id}) {
    const { user } = useContext(UserContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function toggleModal () {
        setModalIsOpen(!modalIsOpen);
    }

    return (
        <div className = "ion-icon">
            <div  onClick = {() => toggleModal()}>
                <RepeatOutline
                    color={'#ffffff'}
                    height="25px"
                    width="25px"
                />
            </div>
            
            <RepostModal
            modalIsOpen={modalIsOpen}
            toggleModal={toggleModal}
            id={id}
            />
            <p>Repost</p>
        </div>
           
    );
}
