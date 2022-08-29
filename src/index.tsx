import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
//import App from './App';
//import App2 from './App2';
//import App3 from './App3';
//import App4 from './App4';
import App5 from './App5';
import {darkTheme} from "./theme";


//밑에 두개는 객체로 구성




//App 에서 theme 색깔 사용할수 있음
//Title에서 theme object 사용가능
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <div>
      <RecoilRoot>
        <ThemeProvider theme= { darkTheme }>
          <App5 />
        </ThemeProvider>
      </RecoilRoot>
  </div>
);

