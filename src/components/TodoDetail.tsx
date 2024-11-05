import { deleteTodo, updateTodo } from '@/api/todo';
import { TodoItem } from '@/types/todo';
import { getToken } from '@/utils/localStorage';
import { Dispatch, useState } from 'react';

interface Props {
  selectedTodo: TodoItem | null;
  setSelectedTodo: Dispatch<TodoItem | null>;
  todoList: TodoItem[];
  setTodoList: Dispatch<TodoItem[]>;
}

const TodoDetail = ({ selectedTodo, setSelectedTodo, todoList, setTodoList }: Props) => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedContent, setEditedContent] = useState<string>('');

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

  return (
    <section className="justify-self-start w-full">
      <h2 className="text-xl font-semibold justify-self-start">상세</h2>
      {selectedTodo && (
        <div>
          <div className="my-2">
            <button type="button" className="mr-2" onClick={handleUpdateTodoForm}>
              투두 수정
            </button>
            <button type="button" onClick={handleDeleteTodo}>
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
            <div className="flex items-start">
              <p className="min-w-12">내용: </p>
              <textarea
                value={showEditForm ? editedContent : selectedTodo?.content}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full min-h-32 border rounded-lg py-1 px-2"
                readOnly={!showEditForm}
              />
            </div>
            {showEditForm && (
              <div className="my-2">
                <button type="button" className="mr-2" onClick={handleEditCancel}>
                  취소
                </button>
                <button type="button" onClick={handleUpdateTodo}>
                  완료
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default TodoDetail;
