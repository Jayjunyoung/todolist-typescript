import {Draggable,DragStart, DropResult} from "react-beautiful-dnd"
import styled from "styled-components";
import React from "react";
import { useSetRecoilState } from 'recoil';


const Card = styled.div<{isDragging: boolean}>`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.isDragging ? '#74b9ff' : props.theme.cardColor};
    box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
`;

interface IDragabbleCardProps {
    toDoId: number;
    index: number;
    toDoText: string;
}

function DraggableCard({toDoId, toDoText, index}: IDragabbleCardProps) {
    return (
        <Draggable draggableId={toDoId+ ""} index={index}>
            {(magic, snapshot) => 
                    <Card 
                        isDragging={snapshot.isDragging}
                        ref={magic.innerRef}
                        {...magic.draggableProps}
                        {...magic.dragHandleProps}> 
                            {toDoText}
                    </Card>}
        </Draggable>
    )
}
//props가 같다면 렌더링하지않도록
//즉 바뀌는 애들만 바뀌도록 하는것
//전부 다 렌더링하는건 시간낭비
export default React.memo(DraggableCard);