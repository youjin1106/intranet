import { useEffect, useRef, useState } from "react";
import Toggle from "./Toggle";
import dayjs from "dayjs";
import { addChart } from "./ScheduleStore";

const WorkingTimer = () => {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [toggleTimer, setToggleTimer] = useState(false);
  const workingTimeRef = useRef(0);
  const startRef = useRef("");

  useEffect(() => {
    if (toggleTimer) {
      const workStartTime = dayjs().format("HH:mm");
      startRef.current = "";
      startRef.current += workStartTime;
      workingTimeRef.current = setInterval(() => {
        setSec((sec) => {
          if (sec === 59) {
            setMin((min) => {
              if (min === 59) {
                setHour((hour) => hour + 1);
                return 0;
              }
              return min + 1;
            });
            return 0;
          }
          return sec + 1;
        });
      }, 1000);
    } else if (!toggleTimer) {
      clearInterval(workingTimeRef.current);
      const workEndTime = dayjs().format("HH:mm");
      startRef.current += "," + workEndTime;
      addChart("yj", "근무중", dayjs().format("YY-MM-DD"), startRef.current);
    }
  }, [toggleTimer]);

  return (
    <>
      <Toggle onChange={() => setToggleTimer(!toggleTimer)} />
      <div className="working flex flex-col">
        {toggleTimer ? (
          <span className="text-primary text-sm font-bold ">근무중</span>
        ) : (
          <span className="text-gray01 text-sm font-bold ">퇴근</span>
        )}
        <span className="text-gray01 text-[12px]">
          {hour < 10 ? `0${hour}` : hour}:{min < 10 ? `0${min}` : min}:
          {sec < 10 ? `0${sec}` : sec}
        </span>
      </div>
    </>
  );
};

export default WorkingTimer;
