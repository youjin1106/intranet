import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

// 셀렉트박스 타입 정의
type SelectBoxProps = {
  options: string[]; // 선택 옵션 목록
  size: string; // 크기
  selectedValue: string; // 선택된 값(초기값)
  onSelect: (selected: string) => void; // 옵션선택 시 호출되는 함수
};

// 셀렉트박스 컴포넌트
const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  size,
  selectedValue,
  onSelect,
}) => {
  // useState 훅을 사용하여 컴포넌트의 상태값에 대한 state
  // selectedValue를 초기값으로 갖고, 선택된 옵션의 값을 관리
  const [selectedOption, setSelectedOption] = useState(selectedValue);

  // useState 훅을 사용하여 옵션 목록의 노출 여부를 설정에 대한 state
  // 초기값은 false로 설정 -> 처음에 미노출
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  // useRef 훅을 사용하여 DOM 요소에 대한 참조를 생성
  // 외부 클릭 이벤트를 감지하여 옵션 목록을 숨길 때 사용
  const selectBoxRef = useRef<HTMLDivElement>(null);

  // 옵션을 클릭했을 때 호출되는 함수
  const handleOptionClick = (selected: string) => {
    setSelectedOption(selected);
    setIsOptionsVisible(false);
    onSelect(selected);
  };

  // 옵션 목록 노출, 비노출 토글 함수
  const toggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  // 셀렉트박스 옵션 값이 변경되거나 컴포넌트가 처음 마운트될 때 함수
  useEffect(() => {
    // 셀렉트박스 외부 클릭시 옵션 목록 숨김
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectBoxRef.current &&
        !selectBoxRef.current.contains(event.target as Node)
      ) {
        setIsOptionsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // 컴포넌트 언마운트 시 클릭 이벤트 리스너 정리
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedOption]);

  // 클래스네임을 사이즈프롭스에 따라 결정하여 스타일 적용
  const dynamicClassName = size === "lg" ? "w-full" : "w-[120px]";

  // 렌더링
  return (
    <div>
      <div
        ref={selectBoxRef}
        className={`custom-select selected-option ${dynamicClassName} bg-bg01 text-md text-gray00 h-8 pl-4 pr-2 py-0.5 rounded border-2 border-solid border-border relative select-none hover :border-primary flex justify-between cursor-pointer`}
        onClick={toggleOptions}
      >
        <div>{selectedOption}</div>
        <span className="material-symbols-outlined text-gray01">
          {isOptionsVisible ? "expand_less" : "expand_more"}
        </span>
        {isOptionsVisible && (
          <ul className="w-full max-h-52 options-list bg-bg01 text-md text-gray00 rounded py-2 border-2 border-solid border-border absolute top-[30px] left-0 z-10 select-none overflow-y-auto">
            {options.map((option, index) => (
              <li
                className="px-3 py-1.5 hover:bg-bg00"
                key={index}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectBox;
