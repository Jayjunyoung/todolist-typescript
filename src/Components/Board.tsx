import {Droppable} from "react-beautiful-dnd";
import DragabbleCard from './DraggableCard';
import styled from "styled-components";


const Wrapper = styled.div`
    width: 300px;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};//boardColor: 회색
    border-radius: 5px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
    background-color: ${(props) =>
    props.isDraggingOver 
    ? 
    '#dfe6e9' 
    : props.isDraggingFromThis 
    ? '#b2bec3' 
    : 'transparent'};
    flex-grow: 1;//flex넓이
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
`;

interface IBordprops {
    toDos: string[],//문자로 이루어진 배열로 자료형 정해주기
    boardId: string,
}

interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

function Board({toDos, boardId}: IBordprops) {
    return (
        <Wrapper>
        <Title>{boardId}</Title>
        <Droppable droppableId={boardId}>
            {(magic, snapshot) => (//스냅샷을 이용해 드래깅 됬을때 색깔 바꾸기
                <Area 
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={magic.innerRef} 
                {...magic.droppableProps}
                >
                    {toDos.map((toDo, index) => (
                    <DragabbleCard key={toDo} index={index} toDo={toDo} />
                ))}
                    {magic.placeholder}
                </Area>
            )}
            </Droppable>
        </Wrapper>
    );
}

export default Board