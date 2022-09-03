import {FaTrash} from "react-icons/fa";
import styled from "styled-components";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { trashState } from '../atom';


const TrashWrapper = styled.div`
    position: absolute;
    bottom: 25px;
    right: 65px;
    width: 33px;
    height: 40px;
`;



function TrashCan()  {
    const trash = useRecoilValue(trashState);
    const onDragEnd = (info: DropResult) => {
        
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
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
            
        </DragDropContext>
    );
}


export default TrashCan;