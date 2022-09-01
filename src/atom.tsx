import { atom, selector } from "recoil"; 

//type categories = "TO_DO" | "DOING" | "DONE"

interface IToDoState {
    [key: string]: string[];//확장성 밑에 3개만으로 제한이 아니라
    //key는 string이고 string으로 이루어진 배열로 가질거야
}


export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        to_do : ["a", "b"],
        doing: ["c", "d", "e"],
        done: ["f"],
    },
});