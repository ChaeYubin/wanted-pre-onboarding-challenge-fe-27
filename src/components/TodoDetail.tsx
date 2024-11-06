import { Dispatch, useState } from 'react';
import { Pencil, Trash } from 'lucide-react';

import { deleteTodo, updateTodo } from '@/api/todo';
import { TodoItem } from '@/types/todo';
import { getToken } from '@/utils/localStorage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
    <Card className="justify-self-start w-full">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="text-2xl font-extrabold">Detail</CardTitle>
        <div className={`ml-auto ${selectedTodo ? 'visible' : 'invisible'}`}>
          <Button type="button" variant="outline" size="icon" onClick={handleUpdateTodoForm}>
            <Pencil />
          </Button>
          <Button type="button" variant="outline" size="icon" className="ml-2" onClick={handleDeleteTodo}>
            <Trash />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {selectedTodo && (
          <div>
            <Input type="text" value={selectedTodo?.title || editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="focus-visible:ring-0 border-none shadow-none" />
            <hr className="my-1" />
            <Textarea
              value={showEditForm ? editedContent : selectedTodo?.content}
              onChange={(e) => setEditedContent(e.target.value)}
              className="focus-visible:ring-0 border-none shadow-none"
              readOnly={!showEditForm}
            />
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
        )}
      </CardContent>
    </Card>
  );
};

export default TodoDetail;
