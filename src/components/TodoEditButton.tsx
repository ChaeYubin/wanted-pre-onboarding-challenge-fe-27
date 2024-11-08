import { useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  todoId: string;
}

const TodoEditButton = ({ todoId }: Props) => {
  const navigate = useNavigate();

  const handleEditTodoButtonClick = () => {
    navigate(`/todo/${todoId}/edit`);
  };

  return (
    <Button type="button" variant="outline" size="icon" onClick={handleEditTodoButtonClick}>
      <Pencil />
    </Button>
  );
};

export default TodoEditButton;
