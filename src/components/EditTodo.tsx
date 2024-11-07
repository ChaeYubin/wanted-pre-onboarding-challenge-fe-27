import { useState } from 'react';
import { Check, X } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSelectSelectedTodo, useUpdateTodo } from '@/store/todoStore';

import { useNavigate } from 'react-router-dom';

const EditTodo = () => {
  const navigate = useNavigate();

  const selectedTodo = useSelectSelectedTodo();
  const updateTodo = useUpdateTodo();

  const [title, setTitle] = useState<string>(selectedTodo!.title || '');
  const [content, setContent] = useState<string>(selectedTodo!.content || '');

  const handleUpdateTodo = async (todoId: string, title: string, content: string) => {
    updateTodo(todoId, title, content);
    navigate(`/todo/${todoId}`);
  };

  const handleEditCancel = () => {
    navigate(`/todo/${selectedTodo!.id}`);
  };

  return (
    <Card className="justify-self-start w-full">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="text-2xl font-extrabold">Detail</CardTitle>
        <div className="ml-auto">
          <Button type="button" variant="outline" size="icon" onClick={handleEditCancel}>
            <X />
          </Button>
          <Button type="button" variant="outline" size="icon" className="ml-2" onClick={() => handleUpdateTodo(selectedTodo!.id, title, content)}>
            <Check />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {selectedTodo && (
          <div>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="focus-visible:ring-0 border-none shadow-none" />
            <hr className="my-1" />
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="focus-visible:ring-0 border-none shadow-none resize-none min-h-[300px]" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EditTodo;
