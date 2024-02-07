import { useAtom } from "jotai";

import IconButton from "../buttons/IconButton";
import { modalAtom } from "./atoms";
import CreateTodo from "./CreateTodo";
import DayOff from "./DayOff";
import HalfDayOff from "./HalfDayOff";

// Modal 컴포넌트 정의
const Modal = () => {
  // useAtom을 통해 modalAtom 상태를 사용하고 상태와 설정 함수를 받습니다.
  const [{ isOpen, content }, setIsOpen] = useAtom(modalAtom); // 상태 객체를 비구조화합니다.

  // 모달을 닫기 위한 함수 정의
  const closeModal = () => {
    // setIsOpen을 호출하여 modalAtom의 값을 false로 업데이트합니다.
    setIsOpen({ isOpen: false, content: "" }); // 올바른 타입을 전달합니다.
  };

  // 모달이 열린 경우에만 화면에 나타나도록 스타일 설정
  return (
    <div
      className="fixed w-screen h-screen bg-[#000000]/80 z-20 flex justify-center items-center"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="relative w-[440px] bg-white rounded p-4 flex flex-col gap-y-6">
        <div className="absolute top-3 right-3">
          <IconButton iconName={"close"} onClick={closeModal} />
        </div>
        {content === "DayOff" && <DayOff />}
        {content === "HalfDayOff" && <HalfDayOff />}
        {content === "openModalCreateTodo" && <CreateTodo />}
      </div>
    </div>
  );
};

// Modal 컴포넌트를 내보냅니다.
export default Modal;
