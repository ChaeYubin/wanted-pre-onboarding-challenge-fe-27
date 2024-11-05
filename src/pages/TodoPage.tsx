import { createTodo, deleteTodo, getTodos } from '@/api/todo';
import TodoDetail from '@/components/TodoDetail';
import TodoList from '@/components/TodoList';
import { TodoItem } from '@/types/todo';
import { getToken } from '@/utils/localStorage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TodoPage = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);

  const [showTodoCreateForm, setShowTodoCreateForm] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');

  useEffect(() => {
    const getTodoList = async () => {
      const response = await getTodos(getToken());
      if (response instanceof Error) {
        console.error(response.message);
        alert(response.message);
        return;
      } else {
        setTodoList(response);
      }
    };

    getTodoList();
  }, []);

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

  const handleDeleteTodo = async () => {
    const response = await deleteTodo({ id: selectedTodo!.id, token: getToken() });

    if (response instanceof Error) {
      console.error(response.message);
      alert(response.message);
      return;
    } else {
      setTodoList(todoList.filter((todo) => todo.id !== selectedTodo!.id));
      setSelectedTodo(null);
    }
  };

  return getToken() === undefined ? (
    <>
      <Link to="/auth/login">로그인하러 가기 →</Link>
    </>
  ) : (
    <div className="grid justify-items-stretch grid-cols-2 pt-8 gap-3">
      <section className="justify-self-start w-full">
        <h2 className="text-xl font-semibold">목록</h2>
        <div className="my-2">
          <button type="button" className="border rounded-lg py-1 px-2" onClick={() => setShowTodoCreateForm(true)}>
            새로운 투두 생성
          </button>
        </div>
        {showTodoCreateForm && (
          <div className="my-3 border rounded-lg p-3">
            <div>
              title: <input className="border rounded-sm py-1 px-2" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            </div>
            <div className="mt-3">
              content: <input className="border rounded-sm py-1 px-2" value={newContent} onChange={(e) => setNewContent(e.target.value)} />
            </div>
            <div className="flex space-x-2 mt-3">
              <button
                type="button"
                className="border rounded-lg py-1 px-2"
                onClick={() => {
                  setShowTodoCreateForm(false);
                  setNewTitle('');
                  setNewContent('');
                }}
              >
                취소
              </button>
              <button type="button" className="border rounded-lg py-1 px-2" onClick={handleCreateTodo}>
                생성
              </button>
            </div>
          </div>
        )}
        <TodoList todoList={todoList} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
      </section>
      <section className="justify-self-start">
        <h2 className="text-xl font-semibold justify-self-start">상세</h2>
        {selectedTodo && (
          <>
            <div className="my-2">
              <button type="button" className="border rounded-lg py-1 px-2 mr-2">
                투두 수정
              </button>
              <button type="button" className="border rounded-lg py-1 px-2" onClick={handleDeleteTodo}>
                투두 삭제
              </button>
            </div>
            <TodoDetail todo={selectedTodo} />
          </>
        )}
      </section>
    </div>
  );
};

export default TodoPage;
