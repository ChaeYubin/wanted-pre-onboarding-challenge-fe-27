import { useEffect } from 'react';
import { Pencil, Trash } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDeleteTodo, useGetTodoById, useSelectSelectedTodo } from '@/store/todoStore';
import AlertModal from './AlertModal';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const TodoDetail = () => {
  const { todoId } = useParams();

  const navigate = useNavigate();

  const getTodo = useGetTodoById();

  const selectedTodo = useSelectSelectedTodo();
  const deleteTodo = useDeleteTodo();

  const handleEditTodoButtonClick = () => {
    navigate(`/todo/${todoId}/edit`);
  };

  useEffect(() => {
    if (todoId) {
      getTodo(todoId);
    }
  }, [todoId]);

  return (
    <Card className="justify-self-start w-full">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="text-2xl font-extrabold">Detail</CardTitle>
        <div className="ml-auto">
          <Button type="button" variant="outline" size="icon" onClick={handleEditTodoButtonClick}>
            <Pencil />
          </Button>
          <AlertModal
            title="투두 삭제"
            description="정말 삭제하시겠어요? 삭제 후에는 복구가 불가능합니다."
            confirmButtonText="삭제"
            onConfirm={() => {
              deleteTodo(selectedTodo!.id);
            }}
          >
            <Button type="button" variant="outline" size="icon" className="ml-2">
              <Trash />
            </Button>
          </AlertModal>
        </div>
      </CardHeader>
      <CardContent>
        {selectedTodo && (
          <div>
            <Input type="text" value={selectedTodo?.title} readOnly className="border-none shadow-none" />
            <hr className="my-1" />
            <Textarea value={selectedTodo?.content} className="border-none shadow-none resize-none min-h-[300px]" readOnly />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoDetail;
