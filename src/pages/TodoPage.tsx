import TodoDetail from '@/components/TodoDetail';
import TodoList from '@/components/TodoList';
import { useGetTodos } from '@/store/todoStore';

const TodoPage = () => {
  useGetTodos();

  return (
    <div className="grid justify-items-stretch grid-cols-2 mt-16 gap-3 h-[500px]">
      <TodoList />
      <TodoDetail />
    </div>
  );
};

export default TodoPage;
