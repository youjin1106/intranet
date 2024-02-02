import { atom } from "jotai";

// TodoData 인터페이스 정의
type TodoData = {
  id: string;
  contents: string;
  order: string;
};

// AddToDo 인터페이스 정의
type AddToDo = {
  contents: string;
};

// 전역 상태로 사용할 atom 정의
export const todoListAtom = atom<TodoData[]>([]); // todoList를 저장하는 Atom
export const errorAtom = atom<Error | null>(null); // 에러 상태를 저장하는 Atom
export const addToDoValue = atom<AddToDo>({ contents: "" }); // 새 할일 입력 값을 저장하는 Atom
