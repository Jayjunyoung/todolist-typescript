import {FaTrash} from "react-icons/fa";
import styled from "styled-components";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import { useSetRecoilState } from 'recoil';
import { trashState } from '../atom';



const TrashWrapper = styled.div`//쓰레기통 위치
    position: absolute;
    bottom: 25px;
    right: 65px;
    width: 33px;
    height: 40px;
`;



function TrashCan()  {
    const trashToDos = useSetRecoilState(trashState); 
    
    return (
            <Droppable droppableId="trash">
                {(magic) => (
                    <TrashWrapper
                    ref={magic.innerRef} 
                    {...magic.droppableProps}>
                        <FaTrash className='icon' size="30"/>
                    </TrashWrapper> 
                    )
                }
            </Droppable>
        );
}   


export default TrashCan;