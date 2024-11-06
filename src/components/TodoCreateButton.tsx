import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import { useCreateTodo } from '@/store/todoStore';

const TodoCreateButton = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const createTodo = useCreateTodo();

  const resetInputs = () => {
    setTitle('');
    setContent('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="ml-auto" variant="outline" size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>할 일 추가</DialogTitle>
          <DialogDescription>제목과 내용을 작성해주세요.</DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={resetInputs}>
              취소
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() => {
                createTodo(title, content);
                resetInputs();
              }}
              disabled={title === '' || content === ''}
            >
              추가
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TodoCreateButton;
