import { useEffect } from 'react';

import { useAtom } from 'jotai';

import PrimaryButton from '../../buttons/PrimaryButton';
import InputBox from '../../login/InputBox';
import {
  addToDoValue,
  errorAtom,
  todoListAtom,
} from './atoms';
import TodoItem from './TodoItem';

type TodoData = {
  id: string;
  contents: string;
  order: string;
};

const TodoList = () => {
  // atoms.ts에서 todoList, 에러상태, 새 할 일 입력값 얻기
  const [todoList, setTodoList] = useAtom(todoListAtom);
  const [error, setError] = useAtom(errorAtom);
  const [value, setValue] = useAtom(addToDoValue);

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
    <div>
      <PrimaryButton label="등록" size="md" onClick={addToDo} />
      <InputBox
        placeholder="할 일을 입력하세요."
        onChange={handleInputChange}
        type="text"
      />
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
