import { atom, AtomEffect, selector } from "recoil"; 

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


// key(여기서는 로컬스토리지에 저장될 key를 말함니다)를 받아 AtomEffect(atom의 effects는 AtomEffect[] 입니다.)를 반환합니다.
const localStorageEffect = (key:string):AtomEffect<IToDoState> => ({setSelf, onSet}) => {
    // 초기값(default)를 설정하기 전 localStorage에 저장된 값을 찾아봅니다.
    const savedValue = localStorage.getItem(key)
    
    // 초기값이 있다면 이를 atom의 default로 설정하고, 그렇지 않다면 atom의 default를 사용합니다.
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    // 이 부분은 상태의 update 함수를 설정합니다
    onSet((newValue, _, isReset) => {
        // 아래와 같은 경우에는 isReset이 false가 들어옵니다.
        // const setToDos = useSetRecoilState(toDoState);
        // const [ToDos, setToDos] = useRecoilState(toDoState);

        // 반면, 아래와 같이 reset하는 경우에는 isReset은 true가 들어옵니다.
        // const resetTodos = useResetRecoilState(toDoState);
        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, JSON.stringify(newValue));
    });
};

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": [],
        Doing: [],
        Done: [],
    },
    // 이 atom의 부수효과(sideEffect)를 설정합니다.
    effects: [localStorageEffect('toDolist')]
});