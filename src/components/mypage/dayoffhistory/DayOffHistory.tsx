import { useAtom } from "jotai";
import { modalAtom } from "../../modal/atoms"; // 프로젝트에 맞게 경로 수정.
import PrimaryButton from "../../buttons/PrimaryButton";

// DayOffHistory 컴포넌트 정의
const DayOffHistory = () => {
  // useAtom을 통해 modalAtom 상태를 받아오고 state 및 설정 함수를 받습니다.
  const [, setIsOpen] = useAtom(modalAtom);

  // 모달을 열기 위한 함수 정의
  const DayOff = () => {
    // setIsOpen을 호출하여 modalAtom의 값을 true로 업데이트하고 content 값을 전달합니다.
    setIsOpen({ isOpen: true, content: "DayOff" });
  };
  const HalfDayOff = () => {
    // setIsOpen을 호출하여 modalAtom의 값을 true로 업데이트하고 content 값을 전달합니다.
    setIsOpen({ isOpen: true, content: "HalfDayOff" });
  };

  // PrimaryButton 컴포넌트를 사용하고 onClick prop으로 openModal 함수를 전달합니다.
  return (
    <div>
      <PrimaryButton label="CaseA" size="md" onClick={DayOff} />
      <PrimaryButton label="CaseB" size="md" onClick={HalfDayOff} />
    </div>
  );
};

// DayOffHistory 컴포넌트를 내보냅니다.
export default DayOffHistory;
