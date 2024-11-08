import React, { ReactNode } from 'react';
import { DialogClose } from '@radix-ui/react-dialog';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Props {
  title: string;
  description: string;
  cancelText?: string;
  onCancel: () => void;
  confirmText: string;
  onConfirm: () => void;
  disableConfirmButton?: boolean;
  children: ReactNode;
}
const Modal = ({ title, description, cancelText = '취소', onCancel, confirmText, disableConfirmButton = false, onConfirm, children }: Props) => {
  const childrenArray = React.Children.toArray(children);

  const TriggerComponent = childrenArray[0];
  const ContentComponent = childrenArray[1];

  return (
    <Dialog>
      <DialogTrigger asChild>{TriggerComponent}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {ContentComponent}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>
              {cancelText}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={onConfirm} disabled={disableConfirmButton}>
              {confirmText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
