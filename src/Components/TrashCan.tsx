import {FaTrash} from "react-icons/fa";
import styled from "styled-components";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ITodo, toDoState} from '../atom';
import DragabbleCard from './DraggableCard';



const TrashWrapper = styled.div`//쓰레기통 위치
    position: absolute;
    bottom: 25px;
    right: 65px;
    width: 33px;
    height: 40px;
`;


function TrashCan()  {
    
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