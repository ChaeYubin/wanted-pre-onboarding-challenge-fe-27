import { Trash } from 'lucide-react';

import Alert from '@/components/common/Alert';
import { Button } from '@/components/ui/button';
import { useDeleteTodo } from '@/hooks/useTodo';
import { getToken } from '@/utils/localStorage';

interface Props {
  todoId: string;
}

const TodoDeleteButton = ({ todoId }: Props) => {
  const deleteTodoMutation = useDeleteTodo({ id: todoId, token: getToken(), redirectTo: '/todo' });

  const onConfirm = () => {
    deleteTodoMutation.mutate();
  };

  return (
    <Alert title="투두 삭제" description="정말 삭제하시겠어요? 삭제 후에는 복구가 불가능합니다." confirmButtonText="삭제" onConfirm={onConfirm}>
      <Button type="button" variant="outline" size="icon" className="ml-2">
        <Trash />
      </Button>
    </Alert>
  );
};

export default TodoDeleteButton;
