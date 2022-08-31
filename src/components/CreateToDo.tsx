import {useForm} from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from './atom';



interface IForm {
    toDo: string;
}


function CreateToDo() {
        const setToDos = useSetRecoilState(toDoState);
        const category = useRecoilValue(categoryState);
        const {handleSubmit , register, setValue} = useForm<IForm>();
        const handleValid = ({ toDo }: IForm) => {
            setToDos((oldToDos) => [//todo: 투두리스트에 적은걸 의미
                { text: toDo, id: Date.now(), category: category },
                ...oldToDos,//기존에 있던 배열요소들은 뒤에 나오게
            ]);
            setValue("toDo", "");
            };
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input
            {...register("toDo", {
            required: "Please write a To Do",
            })}
            placeholder="Write a to do"
            />
        <button>Add</button>
        </form>
    );
}

export default CreateToDo