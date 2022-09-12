import {Droppable} from "react-beautiful-dnd";
import DragabbleCard from './DraggableCard';
import styled from "styled-components";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atom";
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

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
    margin-bottom: 23px;
    font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
    background-color: ${(props) =>
    props.isDraggingOver 
    ? 
    '#dfe6e9' 
    : props.isDraggingFromThis //시작한 지점
    ? '#b2bec3' 
    : 'transparent'};
    flex-grow: 1;//flex넓이
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
`;

const Form = styled.form`
    width: 100%;
    display:flex;
    justify-content:center;
    input {
        width: 80%;
        border-radius: 5px;
    }
`;

interface IBordprops {
    toDos: ITodo[],//객체로 이루어진 배열로 자료형 정해주기
    boardId: string,
}


interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

interface IForm {
    toDo: string;
}


const toDolist = "toDolist";

function Board({toDos, boardId}: IBordprops) {//보드에 추가되는걸 구현하느것
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => {
        const newToDo = {//이걸 적용시키기위해  setrecoilstate이용 함수 이용
            id: Date.now(),
            text: toDo,//form에 입력되는 string
        }
        setToDos(allBoards => {//이전의 배열가져와
            return {
                ...allBoards,//이전의 보드배열들 ex To do
                [boardId]: [//ITodoState에서 정의한거처럼 [key] : ITodo[]로 정의 
                    ...allBoards[boardId],//객체배열 ex) doing
                newToDo,//새로추가된것    
                ],//현재 우리가 있는 done todo같은 board들 리턴
            }
        });
        setValue("toDo", "");//form의 값을 다시 공백으로 설정
    };

    const inputRef = useRef<HTMLInputElement>(null);//input과 연결
    const onClick = () => {
        inputRef.current?.focus();
    setTimeout(() => {
        inputRef.current?.blur();
        }, 5000);//5초후에 blur처리 하겠다
    };
    return (
        <Wrapper>
        <Title>{boardId}</Title>
        <Form onSubmit={handleSubmit(onValid)}>
        <input
            {...register("toDo", { required: true })}
            type="text"
            placeholder={`Write ${boardId}`}
        />
        </Form>
        <Droppable droppableId={boardId}>
            {(magic, snapshot) => (//스냅샷을 이용해 드래깅 됬을때 색깔 바꾸기
                <Area //보드 배경색
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={magic.innerRef} 
                {...magic.droppableProps}
                >
                    {toDos.map((toDo, index) => (//객체로 이루어진 배열 maping
                    <DragabbleCard 
                    boardId={boardId} //보드를 구분하기 위한 아이디까지 넘겨주기
                    key={toDo.id} //객체이므로 toDo.id
                    index={index} 
                    toDoId={toDo.id}
                    toDoText={toDo.text} />
                ))}
                    {magic.placeholder}
                </Area>
            )}
            </Droppable>
        </Wrapper>
    );
}



export default Board