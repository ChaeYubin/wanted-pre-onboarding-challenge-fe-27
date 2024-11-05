import { createTodo } from '@/api/todo';
import { TodoItem } from '@/types/todo';
import { getToken } from '@/utils/localStorage';
import { Dispatch, useState } from 'react';

interface Props {
  todoList: TodoItem[];
  setTodoList: Dispatch<TodoItem[]>;
  selectedTodo: TodoItem | null;
  setSelectedTodo: Dispatch<TodoItem>;
}

const TodoList = ({ todoList, setTodoList, selectedTodo, setSelectedTodo }: Props) => {
  const [showTodoCreateForm, setShowTodoCreateForm] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');

  const handleCreateTodo = async () => {
    const response = await createTodo({ title: newTitle, content: newContent, token: getToken() });

    if (response instanceof Error) {
      console.error(response.message);
      alert(response.message);
      return;
    } else {
      setTodoList([...todoList, response]);
    }

    setNewTitle('');
    setNewContent('');
    setShowTodoCreateForm(false);
  };

  return (
    <section className="justify-self-start w-full">
      <h2 className="text-xl font-semibold">목록</h2>
      <div className="my-2">
        <button type="button" onClick={() => setShowTodoCreateForm(true)}>
          새로운 투두 생성
        </button>
      </div>
      {showTodoCreateForm && (
        <div className="my-3 border rounded-lg p-3">
          <div>
            제목: <input className="border rounded-sm py-1 px-2" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          </div>
          <div className="mt-3">
            내용: <input className="border rounded-sm py-1 px-2" value={newContent} onChange={(e) => setNewContent(e.target.value)} />
          </div>
          <div className="flex space-x-2 mt-3">
            <button
              type="button"
              onClick={() => {
                setShowTodoCreateForm(false);
                setNewTitle('');
                setNewContent('');
              }}
            >
              취소
            </button>
            <button type="button" onClick={handleCreateTodo}>
              생성
            </button>
          </div>
        </div>
      )}
      <div>
        {todoList.map((todo) => (
          <div className={`cursor-pointer w-full ${selectedTodo?.id === todo.id ? 'bg-red-100' : ''}`} onClick={() => setSelectedTodo(todo)}>
            {todo.title}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodoList;
