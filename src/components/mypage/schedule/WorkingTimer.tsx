import { useEffect, useRef, useState } from "react";
import Toggle from "./Toggle";

const WorkingTimer = () => {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [toggleTimer, setToggleTimer] = useState(false);
  const workingTimeRef = useRef<number>(0);
  // const [start, setStart] = useState(0);
  // const [end, setEnd] = useState(0);

  useEffect(() => {
    if (toggleTimer) {
      // setStart(Date.now());
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
      // setEnd(Date.now());
    }
  }, [toggleTimer]);

  return (
    <>
      <Toggle onChange={() => setToggleTimer(!toggleTimer)} />
      {toggleTimer && (
        <span className="text-primary text-sm font-bold ">근무중</span>
      )}
      {/* <button onClick={() => setToggleTimer(!toggleTimer)}>
        {toggleTimer ? "stop" : "start"}
      </button> */}
      <span className="text-gray01 text-[12px]">
        {hour < 10 ? `0${hour}` : hour}:{min < 10 ? `0${min}` : min}:
        {sec < 10 ? `0${sec}` : sec}
      </span>
    </>
  );
};

export default WorkingTimer;
