import { useAtom } from "jotai";
import {
  todoListAtom,
  errorAtom,
  addToDoValue,
} from "../mypage/todolist/atoms";
import InputBox from "../login/InputBox";
import PrimaryButton from "../buttons/PrimaryButton";

type TodoData = {
  id: string;
  contents: string;
  order: string;
};

const CreateTodo = () => {
  // atoms.ts에서 todoList, 에러상태, 새 할 일 입력값 얻기
  const [todoList, setTodoList] = useAtom(todoListAtom);
  const [, setError] = useAtom(errorAtom);
  const [value, setValue] = useAtom(addToDoValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // InputBox 컴포넌트의 값이 변경될 때마다 전역 상태 업데이트
    setValue({ contents: event.target.value }); // InputBox에 입력된 값 콘솔에 출력
    console.log(event.target.value);
  };

  const addToDo = async () => {
    try {
      const addTodoItem = {
        contents: value.contents, // 전역 상태 값에서 contents 사용
        order: (todoList.length + 1).toString(), // 'todolist'의 현재 길이를 기반으로 새로운 order 할당
      }; // 'http://localhost:3001/todolist/'에 POST 요청
      const response = await fetch("http://localhost:3001/todolist/", {
        method: "POST",
        body: JSON.stringify(addTodoItem),
      }); // 새로 추가된 할 일 항목을 응답으로 받은 후 변수에 할당

      const newTodoItem: TodoData = await response.json(); // 새로운 요청을 하지 않고 전역 상태의 todoList를 로컬로 업데이트

      setTodoList((prevTodoList) => {
        const updatedTodoList = [...prevTodoList, newTodoItem]; //새로 추가된 할 일이 포함된 할 일 목록

        console.log("새 항목을 추가한 후의 할 일 목록:", updatedTodoList);
        return updatedTodoList;
      });
    } catch (error) {
      setError(error as Error);
      console.error("새 항목을 추가하는 중 에러가 발생했습니다:", error);
    }
  };

  return (
    <>
      <h2 className="text-titleMd text-gray00 font-bold ">할 일 등록</h2>
      <InputBox
        type="textbox"
        placeholder="할 일을 입력하세요."
        onChange={handleInputChange}
      />
      <PrimaryButton label="등록" size="lg" onClick={addToDo} />
    </>
  );
};

export default CreateTodo;
