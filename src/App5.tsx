import { createGlobalStyle} from 'styled-components';
import ToDoList from './ToDoList';


const GlobalStyle = createGlobalStyle`//css기본값을 설정함
`;

//<>: fragment -> 여러개의 컴포넌트를 렌더링 하고싶다면
function App5() {//useRecoilValue: atom과 App을 연결하는 방법
    return (
        <>
            <GlobalStyle />
            <ToDoList />
        </>
    );
}

export default App5;