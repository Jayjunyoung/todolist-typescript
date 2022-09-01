import {Droppable} from "react-beautiful-dnd";
import DragabbleCard from './DraggableCard';
import styled from "styled-components";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atom";
import { useSetRecoilState } from 'recoil';

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

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
`;

interface IBordprops {
    toDos: ITodo[],//문자로 이루어진 배열로 자료형 정해주기
    boardId: string,
}

interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

interface IForm {
    toDo: string;
}

function Board({toDos, boardId}: IBordprops) {
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => {
        const newToDo = {//이걸 적용시키기위해  setrecoilstate이용 함수 이용
            id: Date.now(),
            text: toDo,
        }
        setToDos(allBoards => {//이전의 배열가져와
            return {
                ...allBoards,//이전의배열들
                [boardId]: [
                    ...allBoards[boardId],//객체배열
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
            placeholder={`Add task on ${boardId}`}
        />
        </Form>
        <Droppable droppableId={boardId}>
            {(magic, snapshot) => (//스냅샷을 이용해 드래깅 됬을때 색깔 바꾸기
                <Area 
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={magic.innerRef} 
                {...magic.droppableProps}
                >
                    {toDos.map((toDo, index) => (//객체로 이루어진 배열 maping
                    <DragabbleCard 
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