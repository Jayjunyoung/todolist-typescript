import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { errorSelector, useRecoilValue } from 'recoil';
import { atom , useRecoilState} from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from './atom';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';


/*function ToDoList() {//event에 대해서 폼이라는걸 알려주는것
    const [todo, setTodo] = useState("");
    const [toDoError, setToDoError] = useState("");
    const onChange = (event:React.FormEvent<HTMLInputElement>) => {
        const {currentTarget : { value },
        } = event; //ES6 문법
        setToDoError("");
        setTodo(value);//currentTarget value로 업데이트를 함
    }
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(todo.length < 10) {
            return setToDoError("To do가 더 길어야됌");
        }
    }
    return <div>
        <form onSubmit={onSubmit}>
            <input onChange = {onChange} value = {todo} placeholder="Write a to do" />
            <button>Add</button>
            {toDoError !== "" ? toDoError : null}
        </form>
    </div>
}
    
*/

//추가되면 추가된걸 쫙 보여주는 컴포넌트
function ToDoList() {//배열 3개를 받아오는것
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    }//option의 value가 string 이므로 categoires를 인식 X
    return (//컴포넌트 2개로 리팩토링
    <div>
        <h1>To Dos</h1>
        <hr />
        <select value = {category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}> Done</option>
        </select>
        <CreateToDo />
        {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
        ))}
    </div>
    );//{...toDo}를 통해 배열요소 전부가져오기
}

export default ToDoList;