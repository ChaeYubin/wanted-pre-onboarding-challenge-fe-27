import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, X } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useGetTodoById, useUpdateTodo } from '@/hooks/useTodo';
import { getToken } from '@/utils/localStorage';

const EditTodo = () => {
  const navigate = useNavigate();
  const { todoId } = useParams();

  const { data: todo, isSuccess } = useGetTodoById({ id: todoId!, token: getToken() });
  const updateTodoMutation = useUpdateTodo({ id: todoId!, token: getToken() });

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (isSuccess && todo) {
      setTitle(todo.title);
      setContent(todo.content);
    }
  }, [isSuccess, todo]);

  const handleUpdateTodo = async (todoId: string, title: string, content: string) => {
    await updateTodoMutation.mutateAsync({ title, content });
    navigate(`/todo/${todoId}`);
  };

  const handleEditCancel = () => {
    navigate(`/todo/${todo?.id}`);
  };

  return (
    <Card className="justify-self-start w-full">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="text-2xl font-extrabold">Detail</CardTitle>
        {isSuccess && (
          <div className="ml-auto">
            <Button type="button" variant="outline" size="icon" onClick={handleEditCancel}>
              <X />
            </Button>
            <Button type="button" variant="outline" size="icon" className="ml-2" onClick={() => handleUpdateTodo(todo.id, title, content)}>
              <Check />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="focus-visible:ring-0 border-none shadow-none" />
        <hr className="my-1" />
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="focus-visible:ring-0 border-none shadow-none resize-none min-h-[300px]" />
      </CardContent>
    </Card>
  );
};

export default EditTodo;
