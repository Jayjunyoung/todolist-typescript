import { atom, selector } from "recoil"; 

//type categories = "TO_DO" | "DOING" | "DONE"

export enum Categories {//객체임
    "TO_DO", //얘넨 사실 숫자이므로 + "" 해서 문자로 바꿔줘야함
    "DOING",
    "DONE",
}//3개중 하나를 쓸수 있게만듬


export interface IToDo {
    text: string;
    id: number;
    category: Categories;
}//카테고리를 미래/현재/완료 한거로 제한 한것


export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO,//실제값은 0
});

export const toDoState = atom<IToDo[]>({
    key: "toDo", //<IToDo[]>를 통해 todo들의 배열임을 명시
    default: [],//기본값 배열로 시작
});

//셀렉터(0830)
export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {//get function이 있어야 atom을 내부로 받을수있다
        const toDos = get(toDoState)//toDoState는 배열
        const category = get(categoryState);
        return toDos.filter(toDo => toDo.category === category)
        
    }
});