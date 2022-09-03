import { atom, selector } from "recoil"; 

//type categories = "TO_DO" | "DOING" | "DONE"

interface IToDoState {
    [key: string]: ITodo[];//확장성 밑에 3개만으로 제한이 아니라
    //key는 string이고 객체로 이루어진 배열로 가질거야
}




export interface ITodo {//이건 객체임
    id: number;
    text: string;
}

//쓰레기통 객체랑 , 배열


export const trashState = atom<boolean>({
    key:"trash",
    default: false,
})



export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": [],
        Doing: [],
        Done: [],
    },
});