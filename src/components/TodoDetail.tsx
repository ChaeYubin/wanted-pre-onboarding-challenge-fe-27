import { Dispatch, useState } from 'react';
import { Check, Pencil, Trash, X } from 'lucide-react';

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
  const [isEditing, setIsEditing] = useState<boolean>(false);
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
      setIsEditing(false);
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
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setEditedTitle('');
    setEditedContent('');
    setIsEditing(false);
  };

  return (
    <Card className="justify-self-start w-full">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="text-2xl font-extrabold">Detail</CardTitle>
        <div className={`ml-auto ${selectedTodo ? 'visible' : 'invisible'}`}>
          {isEditing ? (
            <>
              <Button type="button" variant="outline" size="icon" onClick={handleEditCancel}>
                <X />
              </Button>
              <Button type="button" variant="outline" size="icon" className="ml-2" onClick={handleUpdateTodo}>
                <Check />
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="outline" size="icon" onClick={handleUpdateTodoForm}>
                <Pencil />
              </Button>
              <Button type="button" variant="outline" size="icon" className="ml-2" onClick={handleDeleteTodo}>
                <Trash />
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {selectedTodo && (
          <div>
            <Input
              type="text"
              value={isEditing ? editedTitle : selectedTodo?.title}
              readOnly={!isEditing}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="focus-visible:ring-0 border-none shadow-none"
            />
            <hr className="my-1" />
            <Textarea
              value={isEditing ? editedContent : selectedTodo?.content}
              onChange={(e) => setEditedContent(e.target.value)}
              className="focus-visible:ring-0 border-none shadow-none resize-none"
              readOnly={!isEditing}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoDetail;
