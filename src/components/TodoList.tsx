import { useNavigate, useParams } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TodoCreateButton from '@/components/TodoCreateButton';
import { useGetTodos } from '@/hooks/useTodo';
import { getToken } from '@/utils/localStorage';

const TodoList = () => {
  const navigate = useNavigate();

  const { data: todos, isPending, isError } = useGetTodos(getToken());
  const { todoId } = useParams();

  const handleTodoClick = (id: string) => {
    navigate(`/todo/${id}`);
  };

  return (
    <Card className="justify-self-start w-full">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="text-2xl font-extrabold">List</CardTitle>
        <TodoCreateButton />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1">
          {isPending ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>에러가 발생했습니다.</div>
          ) : (
            <>
              {todos.map((todo) => (
                <Button key={todo.id} type="button" variant="ghost" className={`justify-start ${todoId === todo.id ? 'bg-zinc-100' : ''}`} onClick={() => handleTodoClick(todo.id)}>
                  {todo.title}
                </Button>
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoList;
