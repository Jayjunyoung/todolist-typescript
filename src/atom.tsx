import { atom, selector } from "recoil"; 

//type categories = "TO_DO" | "DOING" | "DONE"

export const minuteState = atom({
    key: "minutes",
    default: 0,
});



export const hourSelector = selector<number>({
    key: "hours",
    get: ({ get }) => {
        const minutes = get(minuteState);
        return minutes / 60;
    },//0831
    set: ({set}, newValue) => {//input은 string이므로 숫자처리
        const minuites = Number(newValue) * 60;
        set(minuteState, minuites);//(수정하고싶은 아톰, 바꿀 값) 
    }
});