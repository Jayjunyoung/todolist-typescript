import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atom";

function App5() {
    //recoilstate: 첫번째엔 아톰의값 or get함수 값, 두번째에는 아톰을 수정하는 함수 or set함수
    const [minutes, setMinutes] = useRecoilState(minuteState);
    const [hours, setHours] = useRecoilState(hourSelector);
    const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
        setMinutes(+event.currentTarget.value);
    };
    const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
        setHours(+event.currentTarget.value);//set함수 발동
    }
    return (
        <div>
            <input
                value={minutes}
                onChange={onMinutesChange}
                type="number"
                placeholder="Minutes"
            />
            <input 
                value={hours}
                onChange = {onHoursChange} 
                type="number" 
                placeholder="Hours" 
            />
        </div>
    )
}
export default App5;