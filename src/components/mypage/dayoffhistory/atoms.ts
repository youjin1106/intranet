import { atom } from "jotai";

// TodoData 인터페이스 정의
type DayOffHistoryData = {
  applicationdate: string;
  range: string;
  auth: string;
  classification: string;
  reason: string;
};

// AddToDo 인터페이스 정의
type AddDayOffData = {
  applicationdate: string;
  range: string;
  auth: string;
  classification: string;
  reason: string;
};

// 전역 상태로 사용할 atom 정의
export const dayOffHistoryAtom = atom<DayOffHistoryData[]>([]); // todoList를 저장하는 Atom
export const errorAtom = atom<Error | null>(null); // 에러 상태를 저장하는 Atom
export const addDayOffValue = atom<Partial<AddDayOffData>>({}); // 새 할일 입력 값을 저장하는 Atom
