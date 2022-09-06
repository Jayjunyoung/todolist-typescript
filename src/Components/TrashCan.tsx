import {FaTrash} from "react-icons/fa";
import styled from "styled-components";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import { useRecoilValue, useSetRecoilState } from 'recoil';



const TrashWrapper = styled.div`//쓰레기통 위치
    position: absolute;
    bottom: 25px;
    right: 65px;
    width: 33px;
    height: 40px;
`;



function TrashCan()  {
    const onDragEnd = (info: DropResult) => {

    }
    return (
                <TrashWrapper>
                    <FaTrash className='icon' size="30"/>
                </TrashWrapper>
            
    );
}


export default TrashCan;