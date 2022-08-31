import "styled-components";

//DefaultTheme에 대한 자료형 설정
//타입스크립트에게 테마의 자료형 알려주는것
declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: "#3F8CF2",
        boardColor: "#DADFE9",
        cardColor: "white",
        }
}