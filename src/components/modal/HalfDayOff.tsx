import { useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import ReactDatePicker from "react-datepicker";
import { useAtom } from "jotai";
import {
  addDayOffValue,
  dayOffHistoryAtom,
  errorAtom,
} from "../mypage/dayoffhistory/atoms";
import SelectBox from "../inputs/SelectBox";
import "./HalfDayOff.css";

const HalfDayOff = () => {
  const [selectedDate, setselectedDate] = useState<Date>(new Date()); // 선택된 날짜 상태와 설정 함수 생성 및 현재 날짜로 초기화
  const [, setDayOffHistory] = useAtom(dayOffHistoryAtom); // dayOffHistoryAtom 상태 atom을 사용하여 상태와 설정 함수 가져오기
  const [, setAddDayOffData] = useAtom(addDayOffValue); // addDayOffValue 상태 atom을 사용하여 상태와 설정 함수 가져오기
  const [, setError] = useAtom(errorAtom); // errorAtom 상태 atom을 사용하여 상태와 설정 함수 가져오기
  const [selectedValue, setSelectedValue] =
    useState<string>("오전 (09:00 ~ 12:00)"); // 선택된 시간대 상태와 설정 함수 생성 및 "AM (09:00 ~ 12:00)"로 초기화

  // 날짜 변경 이벤트 핸들러 함수
  const onChange = (date: Date | null) => {
    date ? setselectedDate(date) : null; // 선택된 날짜 업데이트
  };

  // 날짜 형식 변환 함수
  const formatDate = (date: Date): string => {
    const year = date.getFullYear(); // 연도 추출
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 문자열로 변환하고 두 자리로 만듦
    const day = String(date.getDate()).padStart(2, "0"); // 일을 문자열로 변환하고 두 자리로 만듦
    return `${year}-${month}-${day}`; // 연도-월-일 형식으로 반환
  };

  // 반차 추가 함수
  const handleAddDayOff = async () => {
    try {
      const newDayOff = {
        applicationdate: formatDate(new Date()), // 현재 날짜를 형식에 맞게 변환하여 신청일로 설정
        range: `${formatDate(selectedDate)} ${selectedValue}`, // 날짜와 선택된 시간대를 포함한 범위 설정
        auth: "대기", // 인증 상태를 대기로고정
        classification: "반차", // 분류를 반차로
        reason: "", // 사유항목없으므로 빈칸
      };

      setDayOffHistory((prevDayOffHistory) => [
        ...prevDayOffHistory, // 이전 반차 이력 유지
        newDayOff, // 새로운 반차 레코드 추가
      ]);

      setAddDayOffData({}); // 입력 값 초기화

      const response = await fetch("http://localhost:3001/dayoffhistory", {
        method: "POST", // POST 요청
        headers: {
          "Content-Type": "application/json", // JSON 형식의 헤더 설정
        },
        body: JSON.stringify(newDayOff), // 새로운 반차 데이터를 JSON 문자열로 변환하여 요청 본문에 설정
      });

      if (!response.ok) {
        throw new Error("Failed to add vacation to server."); // 서버에 반차를 추가하는 데 실패한 경우 에러 발생
      }
    } catch (error) {
      setError(error as Error); // 에러 상태 업데이트
      console.error(
        "An error occurred while applying for annual leave:",
        error
      ); // 콘솔에 에러 메시지 출력
    }
  };

  // 옵션 선택 함수
  const userSelect = (selected: string) => {
    setSelectedValue(selected); // 선택된 옵션 값을 selectedValue 상태로 업데이트
  };

  return (
    <>
      <h2 className="text-titleMd text-gray00 font-bold">반차 신청</h2>
      <div>
        <p className="text-mdBold text-gray00 mb-1">날짜 선택</p>
        <ReactDatePicker
          dateFormat="yyyy-MM-dd"
          showIcon
          selected={selectedDate}
          onChange={onChange}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 48 48"
            >
              <mask id="ipSApplication0">
                <g
                  fill="none"
                  stroke="#fff"
                  strokeLinejoin="round"
                  strokeWidth="4"
                >
                  <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                  <path
                    fill="#fff"
                    d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                  ></path>
                </g>
              </mask>
              <path
                fill="#2E2F30"
                d="M0 0h48v48H0z"
                mask="url(#ipSApplication0)"
              ></path>
            </svg>
          }
        />
      </div>

      <SelectBox
        options={["오전 (09:00 ~ 12:00)", "오후 (13:00 ~ 18:00)"]}
        size="lg"
        selectedValue={selectedValue}
        onSelect={userSelect}
      />
      <PrimaryButton label="신청" size="lg" onClick={handleAddDayOff} />
    </>
  );
};

export default HalfDayOff;
