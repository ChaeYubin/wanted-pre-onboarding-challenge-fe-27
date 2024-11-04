import { TodoItem } from '@/types/todo';
import { Dispatch } from 'react';

interface Props {
  todoList: TodoItem[];
  selectedTodo: TodoItem | null;
  setSelectedTodo: Dispatch<TodoItem>;
}

const TodoList = ({ todoList, selectedTodo, setSelectedTodo }: Props) => {
  return (
    <div>
      {todoList.map((todo) => (
        <div className={`cursor-pointer w-full ${selectedTodo?.id === todo.id ? 'bg-red-100' : ''}`} onClick={() => setSelectedTodo(todo)}>
          {todo.title}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
