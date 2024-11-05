import { TodoItem } from '@/types/todo';
import { Dispatch } from 'react';

interface Props {
  todo: TodoItem | null;
  canEdit: boolean;
  editedContent: string;
  setEditedContent: Dispatch<string>;
}

const TodoDetail = ({ todo, canEdit, editedContent, setEditedContent }: Props) => {
  return (
    <div className="flex items-start">
      <p className="min-w-12">내용: </p>
      <textarea value={canEdit ? editedContent : todo?.content} onChange={(e) => setEditedContent(e.target.value)} className="w-full min-h-32 border rounded-lg py-1 px-2" readOnly={!canEdit} />
    </div>
  );
};

export default TodoDetail;
