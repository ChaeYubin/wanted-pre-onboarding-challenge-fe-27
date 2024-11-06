import { Dispatch } from 'react';

import { TodoItem } from '@/types/todo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TodoCreateButton from '@/components/TodoCreateButton';

interface Props {
  todoList: TodoItem[];
  setTodoList: Dispatch<TodoItem[]>;
  selectedTodo: TodoItem | null;
  setSelectedTodo: Dispatch<TodoItem>;
}

const TodoList = ({ todoList, setTodoList, selectedTodo, setSelectedTodo }: Props) => {
  return (
    <Card className="justify-self-start w-full">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="text-2xl font-extrabold">List</CardTitle>
        <TodoCreateButton todoList={todoList} setTodoList={setTodoList} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1">
          {todoList.map((todo) => (
            <Button type="button" variant="ghost" className={`justify-start ${selectedTodo?.id === todo.id ? 'bg-zinc-100' : ''}`} onClick={() => setSelectedTodo(todo)}>
              {todo.title}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoList;
