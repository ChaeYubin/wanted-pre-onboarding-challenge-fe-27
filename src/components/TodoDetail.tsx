import { TodoItem } from '@/types/todo';

const TodoDetail = ({ todo }: { todo: TodoItem | null }) => {
  return (
    <div>
      <input value={todo?.content} />
    </div>
  );
};

export default TodoDetail;
