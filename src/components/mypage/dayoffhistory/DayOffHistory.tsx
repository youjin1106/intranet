import { useEffect } from "react";
import { modalAtom } from "../../modal/atoms";
import { useAtom } from "jotai";
import { dayOffHistoryAtom, errorAtom } from "./atoms";
import PrimaryButton from "../../buttons/PrimaryButton";

type DayOffHistoryData = {
  applicationdate: string;
  range: string;
  auth: string;
  classification: string;
  reason: string;
};

const DayOffHistory = () => {
  // dayOffHisyory, 오류 상태 및 새 할 일 입력 값을 atoms.ts에서 가져옴
  const [dayOffHisyory, setTodoList] = useAtom(dayOffHistoryAtom);
  const [error, setError] = useAtom(errorAtom);

  useEffect(() => {
    // 연차신청내역을 가져오는 함수 정의
    const fetchDayOffHisyory = async () => {
      try {
        // 서버에서 데이터 가져오기
        const response = await fetch("http://localhost:3001/dayoffhistory");
        // 네트워크 응답이 성공적이지 않은 경우 오류 발생
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        // JSON 형식으로 파싱하여 dayOffHisyory 업데이트
        const result: DayOffHistoryData[] = await response.json();
        setTodoList(result);
      } catch (error) {
        // 오류 발생 시 오류 상태 업데이트
        setError(error as Error);
        console.error("연차신청내역 로드하는 중 오류가 발생했습니다:", error);
      }
    };

    // 컴포넌트가 마운트될 때 한 번만 실행
    fetchDayOffHisyory();
  }, []);

  const [, setIsOpen] = useAtom(modalAtom);
  const DayOff = () => {
    // setIsOpen을 호출하여 modalAtom의 값을 true로 업데이트하고 content 값을 전달
    setIsOpen({ isOpen: true, content: "DayOff" });
  };
  const HalfDayOff = () => {
    // setIsOpen을 호출하여 modalAtom의 값을 true로 업데이트하고 content 값을 전달
    setIsOpen({ isOpen: true, content: "HalfDayOff" });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-titleMd text-gray00 font-bold ">연차 신청</h2>
        <div className="flex gap-2">
          <PrimaryButton label="연차" size="md" onClick={DayOff} />
          <PrimaryButton label="반차" size="md" onClick={HalfDayOff} />
        </div>
      </div>
      {dayOffHisyory !== undefined ? (
        // 연차신청내역이 있는 경우
        dayOffHisyory.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="font-bold">
                <th className="border-b dark:border-slate-600 font-medium p-4 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-center">
                  신청일
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-center">
                  기간
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-center">
                  내용
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-center">
                  승인
                </th>
              </tr>
            </thead>
            <tbody>
              {dayOffHisyory.map((dayOffItem) => (
                <tr>
                  <td className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-center">
                    {dayOffItem.applicationdate}
                  </td>
                  <td className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-center">
                    {dayOffItem.range}
                  </td>
                  <td className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-center">
                    {dayOffItem.classification}
                  </td>
                  <td className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-center">
                    {dayOffItem.auth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // 연차신청내역이 없는 경우
          <p className="text-md text-center p-2">
            등록된 연차 또는 반차가 없습니다.
          </p>
        )
      ) : error ? (
        // 오류가 있는 경우
        <p>오류: {error.message}</p>
      ) : null}
    </div>
  );
};

export default DayOffHistory;
