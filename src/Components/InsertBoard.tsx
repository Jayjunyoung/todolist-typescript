import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atom";




const Form = styled.form`
    position: absolute;
    top: 120px;
    left: 65px;
    width: 300px;
`;

const Input = styled.input`
    width: 80%;
    padding: 10px;
    border-style: none;
    border-radius: 5px;
    margin-bottom: 16px;
    outline: none;
`;

interface InewBoard {
    board?: string
}



function InsertBoard() {
    const [toDos, setToDos] = useRecoilState(toDoState);//atom을 가져와서 또 변형하기
    const { register, setValue, handleSubmit } = useForm();
    const onValid = ({ board }: InewBoard) => {
    setToDos((allBoards) => {
      // 원래 보드에 새로운 빈 보드 추가
      // input에 적은 board가 키가되고 그 보드의 값은 []로 둔다
        return { 
            ...allBoards, [board + ""]  : [] 
        };
    });
        setValue("board", "");
    };
    return (
        <>
            <Form onSubmit={handleSubmit(onValid)}>
                <Input
                {...register("board", { required: true })}
                type="text"
                placeholder={`Add board`}
            />
            </Form>
        </>
    );
}



export default InsertBoard