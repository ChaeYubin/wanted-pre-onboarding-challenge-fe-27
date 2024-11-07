import { useState } from 'react';
import { Check, Pencil, Trash, X } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useDeleteTodo, useSelectSelectedTodo, useUpdateTodo } from '@/store/todoStore';
import AlertModal from './AlertModal';

const TodoDetail = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedContent, setEditedContent] = useState<string>('');

  const selectedTodo = useSelectSelectedTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

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
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="ml-2"
                onClick={() => {
                  updateTodo(selectedTodo!.id, editedTitle, editedContent);
                  setIsEditing(false);
                }}
              >
                <Check />
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="outline" size="icon" onClick={handleUpdateTodoForm}>
                <Pencil />
              </Button>
              <AlertModal
                title="투두 삭제"
                description="투두를 정말 삭제하시겠어요? 삭제 후에는 복구가 불가능합니다."
                cancelButtonText="취소"
                confirmButtonText="삭제"
                onConfirm={() => {
                  deleteTodo(selectedTodo!.id);
                  setIsEditing(false);
                }}
              >
                <Button type="button" variant="outline" size="icon" className="ml-2">
                  <Trash />
                </Button>
              </AlertModal>
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
              className="focus-visible:ring-0 border-none shadow-none resize-none min-h-[300px]"
              readOnly={!isEditing}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoDetail;
