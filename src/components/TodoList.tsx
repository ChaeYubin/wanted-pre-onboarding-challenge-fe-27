import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TodoCreateButton from '@/components/TodoCreateButton';
import { useGetTodoById, useGetTodos, useSelectSelectedTodo, useSelectTodos } from '@/store/todoStore';
import { useEffect } from 'react';

const TodoList = () => {
  const todos = useSelectTodos();
  const getTodos = useGetTodos();
  const selectedTodo = useSelectSelectedTodo();
  const getTodo = useGetTodoById();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Card className="justify-self-start w-full">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="text-2xl font-extrabold">List</CardTitle>
        <TodoCreateButton />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1">
          {todos.map((todo) => (
            <Button key={todo.id} type="button" variant="ghost" className={`justify-start ${selectedTodo?.id === todo.id ? 'bg-zinc-100' : ''}`} onClick={() => getTodo(todo.id)}>
              {todo.title}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoList;
