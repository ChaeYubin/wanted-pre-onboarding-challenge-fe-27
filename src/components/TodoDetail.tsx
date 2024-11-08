import { useParams } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getToken } from '@/utils/localStorage';
import { useGetTodoById } from '@/hooks/useTodo';
import TodoDeleteButton from '@/components/TodoDeleteButton';
import TodoEditButton from '@/components/TodoEditButton';

const TodoDetail = () => {
  const { todoId } = useParams();

  const { data: todo, isPending, isError, isSuccess } = useGetTodoById({ id: todoId!, token: getToken() });

  return (
    <Card className="justify-self-start w-full">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="text-2xl font-extrabold">Detail</CardTitle>
        <div className="ml-auto">
          {isSuccess && (
            <>
              <TodoEditButton todoId={todoId!} />
              <TodoDeleteButton todoId={todoId!} />
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <></>
        ) : isError ? (
          <div>에러가 발생했습니다.</div>
        ) : (
          <>
            <Input type="text" value={todo.title} readOnly className="focus-visible:ring-0 border-none shadow-none" />
            <hr className="my-1" />
            <Textarea value={todo.content} className="focus-visible:ring-0 border-none shadow-none resize-none min-h-[300px]" readOnly />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoDetail;
