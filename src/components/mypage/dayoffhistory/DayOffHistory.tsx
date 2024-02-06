import { useAtom } from "jotai";
import { modalAtom } from "../../modal/atoms";
import PrimaryButton from "../../buttons/PrimaryButton";

// DayOffHistory 컴포넌트 정의
const DayOffHistory = () => {
  // useAtom을 통해 modalAtom 상태를 받아오고 state 및 설정 함수받기
  const [, setIsOpen] = useAtom(modalAtom);

  // 모달을 열기 위한 함수 정의
  const DayOff = () => {
    // setIsOpen을 호출하여 modalAtom의 값을 true로 업데이트하고 content 값을 전달
    setIsOpen({ isOpen: true, content: "DayOff" });
  };
  const HalfDayOff = () => {
    // setIsOpen을 호출하여 modalAtom의 값을 true로 업데이트하고 content 값을 전달
    setIsOpen({ isOpen: true, content: "HalfDayOff" });
  };

  // PrimaryButton 컴포넌트를 사용하고 onClick prop으로 openModal 함수를 전달
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-titleMd text-gray00 font-bold ">연차 신청 내역</h2>
        <div className="flex gap-2">
          <PrimaryButton label="연차" size="md" onClick={DayOff} />
          <PrimaryButton label="반차" size="md" onClick={HalfDayOff} />
        </div>
      </div>
    </div>
  );
};

export default DayOffHistory;
