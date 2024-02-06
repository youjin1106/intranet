import { atom } from "jotai";

type ModalProps = {
  isOpen: boolean;
  content: string;
};

// modalAtom이라는 이름의 상태를 생성하며 초기값을 false로 설정
export const modalAtom = atom<ModalProps>({ isOpen: false, content: "" });
