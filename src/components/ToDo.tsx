import { ReactFragment } from 'react';
import { useSetRecoilState } from 'recoil';
import { Categories, IToDo, toDoState } from './atom';







//IToDo를 아톰에서 임포트
function ToDo({text, category, id}: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name } ,
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const oldToDo = oldToDos[targetIndex];
            const newToDo = {text, id, category: name as any};
            //카테고리는 현재 선택한 버튼걸로 적용
            return [...oldToDos.slice(0, targetIndex), 
            newToDo, //front , 추가되는 것, 추가되는것 기점 이후(back)
            ...oldToDos.slice(targetIndex+1),
            //배열을 안바꾸고 새로 하나 추가하는 방법
        ];
        });
    };
    return ( //onClick 함수에 인자를 넘기는 방법
    <li>
        <span>{text}</span>
        {category !== Categories.DOING && (
        <button name={Categories.DOING + ""} onClick={onClick}>
            Doing
        </button>
        )} 
        {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO + ""} onClick={onClick}>
            To Do
        </button>
        )}
        {category !== Categories.DONE && (
        <button name={Categories.DONE + ""} onClick={onClick}>
            Done
        </button>
        )}
    </li>
);
}

export default ToDo