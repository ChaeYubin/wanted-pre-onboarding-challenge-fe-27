import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateTodo } from '@/hooks/useTodo';
import { getToken } from '@/utils/localStorage';
import Modal from '@/components/common/Modal';

const TodoCreateButton = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const createTodoMutation = useCreateTodo({ token: getToken() });

  const resetInputs = () => {
    setTitle('');
    setContent('');
  };

  const onConfirm = () => {
    createTodoMutation.mutate({ title, content });
    resetInputs();
  };

  return (
    <Modal title="할 일 추가" description="제목과 내용을 작성해주세요." onCancel={resetInputs} confirmText="추가" disableConfirmButton={title === '' || content === ''} onConfirm={onConfirm}>
      {/* Modal Trigger */}
      <Button type="button" className="ml-auto" variant="outline" size="icon">
        <Plus />
      </Button>
      {/* Modal Content */}
      <div className="flex flex-col space-y-3">
        <div className="flex flex-row items-center space-x-2">
          <Label htmlFor="title" className="flex-none">
            제목
          </Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="focus-visible:ring-0" />
        </div>
        <div className="flex flex-row items-center space-x-2">
          <Label htmlFor="content" className="flex-none">
            내용
          </Label>
          <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="focus-visible:ring-0 resize-none" />
        </div>
      </div>
    </Modal>
  );
};

export default TodoCreateButton;
