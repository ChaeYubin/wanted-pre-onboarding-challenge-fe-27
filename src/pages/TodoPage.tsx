import { createTodo, deleteTodo, getTodos, updateTodo } from '@/api/todo';
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

  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedContent, setEditedContent] = useState<string>('');

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

    if (getToken()) {
      getTodoList();
    }
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

  const handleUpdateTodoForm = () => {
    setEditedTitle(selectedTodo?.title || '');
    setEditedContent(selectedTodo?.content || '');
    setShowEditForm(true);
  };

  const handleEditCancel = () => {
    setShowEditForm(false);
    setEditedTitle('');
    setEditedContent('');
  };

  const handleUpdateTodo = async () => {
    const response = await updateTodo({ id: selectedTodo!.id, title: editedTitle, content: editedContent, token: getToken() });

    if (response instanceof Error) {
      console.error(response.message);
      alert(response.message);
      return;
    } else {
      setTodoList(
        todoList.map((todo) => {
          if (todo.id === selectedTodo!.id) {
            return { ...todo, title: editedTitle, content: editedContent };
          } else {
            return todo;
          }
        }),
      );

      setSelectedTodo({ ...selectedTodo!, title: editedTitle, content: editedContent });
      setShowEditForm(false);
    }
  };

  return getToken() === null ? (
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
              제목: <input className="border rounded-sm py-1 px-2" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            </div>
            <div className="mt-3">
              내용: <input className="border rounded-sm py-1 px-2" value={newContent} onChange={(e) => setNewContent(e.target.value)} />
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
      <section className="justify-self-start w-full">
        <h2 className="text-xl font-semibold justify-self-start">상세</h2>
        {selectedTodo && (
          <div>
            <div className="my-2">
              <button type="button" className="border rounded-lg py-1 px-2 mr-2" onClick={handleUpdateTodoForm}>
                투두 수정
              </button>
              <button type="button" className="border rounded-lg py-1 px-2" onClick={handleDeleteTodo}>
                투두 삭제
              </button>
            </div>
            <div>
              {showEditForm && (
                <div className="flex flex-row items-center my-2">
                  <p className="min-w-12">제목:</p>
                  <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="border rounded-lg py-1 px-2 w-full" />
                </div>
              )}
              <TodoDetail todo={selectedTodo} canEdit={showEditForm} editedContent={editedContent} setEditedContent={setEditedContent} />
              {showEditForm && (
                <div className="my-2">
                  <button type="button" className="border rounded-lg py-1 px-2 mr-2" onClick={handleEditCancel}>
                    취소
                  </button>
                  <button type="button" className="border rounded-lg py-1 px-2" onClick={handleUpdateTodo}>
                    완료
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TodoPage;
