import {DragDropContext, DropResult} from "react-beautiful-dnd";
import { useRecoilState } from 'recoil';
import styled from "styled-components";
import { toDoState } from './atom';
import Board from "./Components/Board";


const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
`;








function App5() {//드래그앤드랍
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = (info: DropResult) => {
        const {destination, draggableId, source} = info;
        if(!destination) return;
        if(destination?.droppableId === source.droppableId) {//같은 보드라면
            setToDos(allBoards => {  
                const boardCopy = [...allBoards[source.droppableId]];
                const taskObj = boardCopy[source.index];//todo 객체전부를 가져와줄것
                //[x] : x가 키 즉 source.droppableId가 키
            //기존 복사한거에서 삭제 하나하기
            boardCopy.splice(source.index, 1);
            //삭제한걸 원하는 위치에 넣기
            boardCopy.splice(destination?.index, 0 , taskObj);
            return {//세개 중 바뀌는 하나만 보여지게
                ...allBoards,//모든 board들을 가져와
                [source.droppableId]: boardCopy,//복사본이라고 알려주는것
            }
        });//a,b,c,d이런게 draggableId임 
        }
        if(destination.droppableId !== source.droppableId) {
            setToDos((allBoards) => {//다른 보드로넘어갈땐 복사본 2개필요
                const sourceBoard = [...allBoards[source.droppableId]];
                const taskObj = sourceBoard[source.index];//todo 객체전부를 가져와줄것

                const destinationBoard = [...allBoards[destination.droppableId]];
                sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination?.index, 0 , taskObj);
                return {
                    ...allBoards,//이전의 보드들
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard,
                }
            });
        }
    };//드랍할때 적용되는 함수

    //droppable,draggable의 자식요소는 함수여야함
    //droppable은 1개이다.
    //context 부분으로 감싼 영역이 드래그앤드랍이된다
    return <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
            <Boards>
                {Object.keys(toDos).map(boardId => <Board boardId={boardId} key = {boardId} toDos={toDos[boardId]} />)}
            </Boards>
        </Wrapper>
    </DragDropContext>
}//Board끝에 placrholder함으로써 Board화면 안변하도록 하기

export default App5;