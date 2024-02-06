import { useEffect } from "react";
import { modalAtom } from "../../modal/atoms";
import { useAtom } from "jotai";
import { todoListAtom, errorAtom } from "./atoms";
import PrimaryButton from "../../buttons/PrimaryButton";
import TodoItem from "./TodoItem";

type TodoData = {
  id: string;
  contents: string;
  order: string;
};

const TodoList = () => {
  // atoms.ts에서 todoList, 에러상태, 새 할 일 입력값 얻기
  const [todoList, setTodoList] = useAtom(todoListAtom);
  const [error, setError] = useAtom(errorAtom);

  useEffect(() => {
    // 할 일 목록 가져오기 함수 정의
    const fetchTodoList = async () => {
      try {
        // 'http://localhost:3001/todolist'에서 데이터 가져오기
        const response = await fetch("http://localhost:3001/todolist"); // 네트워크 응답이 성공적이지 않으면 에러 발생

        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않음");
        } // JSON 형식으로 파싱하여 todoList 업데이트

        const result: TodoData[] = await response.json();
        setTodoList(result);
        console.log("할 일 목록:", result);
      } catch (error) {
        // 에러 발생 시 에러 상태 업데이트
        setError(error as Error);
        console.error("할 일 목록을 로딩하는 중 에러 발생:", error);
      }
    }; // 컴포넌트가 마운트될 때 한 번만 실행

    fetchTodoList();
  }, []);

  const [, setIsOpen] = useAtom(modalAtom);
  const openModalCreateTodo = () => {
    // setIsOpen을 호출하여 modalAtom의 값을 true로 업데이트하고 content 값을 전달합니다.
    setIsOpen({ isOpen: true, content: "openModalCreateTodo" });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-titleMd text-gray00 font-bold ">할 일 등록</h2>
        <PrimaryButton label="등록" size="md" onClick={openModalCreateTodo} />
      </div>
      {todoList !== undefined ? (
        // 할 일이 존재하는 경우
        todoList.length > 0 ? (
          <ul>
            {todoList.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                contents={todo.contents}
                order={todo.order}
              />
            ))}
          </ul>
        ) : (
          // 할 일 목록이 없는 경우
          <p className="text-md text-center p-2">등록된 할 일이 없습니다.</p>
        )
      ) : error ? (
        // 에러가 있는 경우
        <p>Error: {error.message}</p>
      ) : null}
    </div>
  );
};

export default TodoList;
