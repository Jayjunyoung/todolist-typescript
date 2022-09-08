import {Draggable,DragStart, DropResult} from "react-beautiful-dnd"
import styled from "styled-components";
import React from "react";
import { FaFontAwesome } from "react-icons/fa";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { toDoState } from '../atom';


const Card = styled.div<{isDragging: boolean}>`
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.isDragging ? '#74b9ff' : props.theme.cardColor};
    box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
`;


const Button = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`;




interface IDragabbleCardProps {
    toDoId: number;
    index: number;
    toDoText: string;
    boardId: string;
}

function DraggableCard({toDoId, toDoText, index, boardId}: IDragabbleCardProps) {
    const setToDo = useSetRecoilState(toDoState);
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setToDo(allboards => {
            console.log(allboards);
            console.log(boardId);
            const board = [...allboards[boardId]]
            board.splice(e.currentTarget as any, 1);//시작 위치, 자를 갯수
            return {
                ...allboards,
                [boardId] : board,
            }
        });
    }
    return (
        <Draggable draggableId={toDoId+ ""} index={index}>
            {(magic, snapshot) => 
                    <Card 
                        isDragging={snapshot.isDragging}
                        ref={magic.innerRef}
                        {...magic.draggableProps}
                        {...magic.dragHandleProps}>
                        <span style={{
                            width: 30,
                        }}>🔥</span>
                            {toDoText}
                        <Button onClick={onClick}>
                            <span>X</span>
                        </Button>
                    </Card>}
        </Draggable>
    )
}
//props가 같다면 렌더링하지않도록
//즉 바뀌는 애들만 바뀌도록 하는것
//전부 다 렌더링하는건 시간낭비
export default React.memo(DraggableCard);