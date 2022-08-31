import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import styled from "styled-components";


const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
`;


const Board = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.boardColor};//boardColor: 회색
    border-radius: 5px;
    min-height: 200px;
`;

const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.cardColor};
`;

const toDos = ["a", "b", "c", "d", "e", "f"];

function App5() {//드래그앤드랍
    const onDragEnd = () => {};//드랍할때 적용되는 함수

    //droppable,draggable의 자식요소는 함수여야함
    //context 부분을 감싼 영역이 드래그앤드랍이된다
    return <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
            <Boards>
            <Droppable droppableId="one">
                {(magic) => //magic안에 여러 인터페이스 담겨있음
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                    {toDos.map((toDo, index) => <Draggable draggableId={toDo} index={index}>
                        {(magic) => 
                        <Card 
                        ref={magic.innerRef}
                        {...magic.draggableProps}
                        {...magic.dragHandleProps}> 
                            {toDo}
                        </Card>}
                    </Draggable>)}
                    {magic.placeholder} 
                </Board>}
            </Droppable>
            </Boards>
        </Wrapper>
    </DragDropContext>
}//Board끝에 placrholder함으로써 Board화면 안변하도록 하기

export default App5;