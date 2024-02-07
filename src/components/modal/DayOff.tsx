import { useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import InputBox from "../login/InputBox";
import ReactDatePicker from "react-datepicker";
import { useAtom } from "jotai";
import {
  addDayOffValue,
  dayOffHistoryAtom,
  errorAtom,
} from "../mypage/dayoffhistory/atoms";
import "react-datepicker/dist/react-datepicker.css";
import "./DayOff.css";

const DayOff = () => {
  const [startDate, setStartDate] = useState<Date>(new Date()); // 시작 날짜 상태와 설정 함수를 생성하고 현재 날짜로 초기화
  const [endDate, setEndDate] = useState<Date | null>(null); // 종료 날짜 상태와 설정 함수를 생성하고 초기값은 null
  const [, setDayOffHistory] = useAtom(dayOffHistoryAtom); // dayOffHistoryAtom 상태 아톰을 사용하여 상태와 설정 함수를 가져옴
  const [addDayOffData, setAddDayOffData] = useAtom(addDayOffValue); // addDayOffValue 상태 아톰을 사용하여 상태와 설정 함수를 가져옴
  const [, setError] = useAtom(errorAtom); // errorAtom 상태 아톰을 사용하여 상태와 설정 함수를 가져옴

  // 날짜 변경 함수
  const onChange = (dates: [Date, Date | null]) => {
    const [start, end] = dates; // 시작 날짜와 종료 날짜를 추출
    setStartDate(start); // 시작 날짜를 업데이트
    setEndDate(end); // 종료 날짜를 업데이트
  };

  // 날짜 형식을 변환 함수
  const formatDate = (date: Date): string => {
    const year = date.getFullYear(); // 연도 추출
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 문자열로 변환하고 두 자리로 만듦
    const day = String(date.getDate()).padStart(2, "0"); // 일을 문자열로 변환하고 두 자리로 만듦
    return `${year}-${month}-${day}`; // 연-월-일 형식으로 반환
  };

  // 입력 상자 값 변경 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // 이벤트에서 이름과 값 추출
    setAddDayOffData((prevData) => ({
      // addDayOffData 상태를 업데이트하는 함수 호출
      ...prevData, // 이전 데이터를 복사하여 유지
      [name]: value, // 해당 이름의 값을 새로운 값으로 설정
    }));
    console.log(value); // 값 콘솔 출력
  };

  // 연차 추가 함수
  const handleAddDayOff = async () => {
    try {
      const newDayOff = {
        applicationdate: formatDate(new Date()), // 현재 날짜를 형식에 맞게 변환하여 신청 날짜로 설정
        range: endDate
          ? `${formatDate(startDate)} ~ ${formatDate(endDate)}`
          : `${formatDate(startDate)}`, // 시작 날짜와 종료 날짜가 모두 있으면 범위를 설정, 아니면 시작 날짜만 설정
        auth: "대기", // 승인 상태를 "대기"로 설정
        classification: "연차", // 분류를 "연차"로 설정
        reason: addDayOffData.reason || "", // 사유를 설정, 없으면 빈 문자열로 설정
      };

      setDayOffHistory((prevDayOffHistory) => [
        ...prevDayOffHistory, // 이전 연차 기록 유지
        newDayOff, // 새로운 연차 기록 추가
      ]);

      setAddDayOffData({}); // 입력 값 초기화

      const response = await fetch("http://localhost:3001/dayoffhistory", {
        method: "POST", // POST 요청
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 헤더 설정
        },
        body: JSON.stringify(newDayOff), // 새로운 연차 데이터를 JSON 문자열로 변환하여 요청 본문으로 설정
      });

      if (!response.ok) {
        throw new Error("Failed to add vacation to server."); // 서버에 연차를 추가하는 데 실패하면 오류 발생
      }
    } catch (error) {
      setError(error as Error); // 에러 상태 업데이트
      console.error("연차신청을 하는 중 에러가 발생했습니다.:", error); // 콘솔에 에러 메시지 출력
    }
  };

  return (
    <>
      <h2 className="text-titleMd text-gray00 font-bold">연차 신청</h2>
      <div>
        <p className="text-mdBold text-gray00 mb-1">기간 선택</p>
        <ReactDatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </div>
      <InputBox
        type="textbox"
        placeholder="사유를 입력하세요."
        onChange={handleInputChange}
      />{" "}
      <PrimaryButton label="신청" size="lg" onClick={handleAddDayOff} />
    </>
  );
};

export default DayOff;
