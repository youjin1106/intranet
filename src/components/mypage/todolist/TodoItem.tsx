import IconButton from "../../buttons/IconButton";
import { useAtom } from "jotai";
import { todoListAtom, errorAtom } from "./atoms";

type TodoData = {
  id: string;
  contents: string;
  order: string;
};

const TodoItem = (props: TodoData) => {
  // jotai atoms를 통해 todoList와 error 상태 가져오기
  const [, setTodoList] = useAtom(todoListAtom);
  const [, setError] = useAtom(errorAtom); // 할 일 삭제 처리 함수

  const handleDeleteTodo = async () => {
    try {
      // 'http://localhost:3001/todolist/:id'로 DELETE 요청 보내기
      const response = await fetch(
        `http://localhost:3001/todolist/${props.id}`,
        {
          method: "DELETE",
        }
      ); // 네트워크 응답이 성공하지 않으면 에러 발생

      if (!response.ok) {
        throw new Error("Network response is incorrect");
      } // 아이템 삭제 후 todoList 업데이트

      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => todo.id !== props.id)
      );
      console.log(`삭제 완료 : ${props.contents}(ID : ${props.id})`);
    } catch (error) {
      // 에러 발생 시 에러 상태 업데이트
      setError(error as Error);
      console.error(`삭제 실패 : ${props.contents}(ID : ${props.id}) :`, error);
    }
  };

  return (
    <div className="flex items-center basis-full mb-2">
      <p className="text-mdBold text-gray00 basis-full overflow-hidden whitespace-nowrap break-all text-ellipsis">
        {props.contents}
      </p>
      <IconButton iconName="delete" onClick={handleDeleteTodo} />
    </div>
  );
};

export default TodoItem;
