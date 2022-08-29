import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { errorSelector } from 'recoil';


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
interface IForm {//타입스크립트 에게 폼의 형식 알려주기
    Email: string;
    FirstName: string;
    LastName: string;
    Username: string;
    Password: string;
    Password1: string;
    extraError?: string;//필수가 아님(?)
}


function ToDoList() {//0829
    const { 
        register , 
        handleSubmit, 
        formState:{ errors },
        setError, //에러를 발생시키는 함수
    } = useForm<IForm>({
        defaultValues: {//폼의 기본값 설정
            Email: "@naver.com",
        }
    });//react-hook-form
    //watch: input에 입력된 값 모두 추적
    const onValid = (data: IForm) => {//데이터가 유효할때 발동된다
        if(data.Password !== data.Password1) {//data 인자로 사용
            setError("Password1", {message : "비밀번호 달라요"});
        }
        setError("extraError", {message: "서버 해킹"});//전체폼에 대한 에러
    }
    console.log(errors);//에러가 어디서 났는지 알려줌

    //onChange랑 value useState 모두 대체
    //레지스터함수를통해 name에 toDo 라는 객체들감

    //데이터가 유효할때 발생하는 onValid 함수 호출(필수)
    return <div>
        <form style = {{display:"flex", flexDirection:"column"}} onSubmit={handleSubmit(onValid)}>
            <input {...register("Email", {
                required:"Email is required", //아예 작성이 안돈경우엔 이게뜸
                pattern: {//정규식으로 조건 주기!: naver.com으로 끝나는 이메일만 허용
                    value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                    message: "Only naver.com emails allowed",//이메일 형식이 잘못되었을 경우 뜸
            },
            })} 
                placeholder="Email" 
            />
            <span>{errors?.Email?.message} </span>
            <input {...register("FirstName", {required:"write here"})} 
            placeholder="First" 
            />
            <span>{errors?.FirstName?.message} </span>
            <input {...register("LastName", {required:"write here"})} 
            placeholder="Last" 
            />
            <span>{errors?.LastName?.message} </span>
            <input {...register("Username", {required:"write here", minLength: 5})} placeholder="Username" />
            <span>{errors?.Username?.message} </span>
            <input {...register("Password", {
                required:"Password is required", 
                minLength: {
                    value: 10,
                    message:"Your Password is short",
                },
            })} 
            placeholder="Password" 
            />
            <span>{errors?.Password?.message} </span>
            <input {...register("Password1", {required:"write here"})} placeholder="Passcheck" />
            <span>{errors?.Password1?.message} </span>
            <button>Add</button>
            <span>{errors?.extraError?.message}</span>
        </form>
    </div>
}


export default ToDoList;