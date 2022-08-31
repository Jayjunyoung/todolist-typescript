import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);//동일한카테고리의배열담겨있음
    const [category, setCategory] = useRecoilState(categoryState);
    //category의 기본값은 To Do임
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };
    console.log(toDos);
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <select value={category} onInput={onInput}>
                <option value={Categories.TO_DO}>To Do</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
            </select>
            <CreateToDo />
            {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
            ))}
        </div>
    );
}
export default ToDoList;