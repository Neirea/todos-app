import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useFormik } from 'formik';
import { TTodo, TUpdateTodo } from '../../common/types/todo.type';
import { ManageTodoForm } from './manage-todo-form';
import { useUpdateTodo } from '../hooks/update-todo.hook';

type Props = {
  todo: TTodo;
  isOpen: boolean;
  closeModal: () => void;
};

export const UpdateTodo = ({ todo, isOpen, closeModal }: Props) => {
  const { created_at: createdAt, updated_at: updatedAt, ...newTodo } = todo;
  const { mutateAsync: updateTodo, error: updateError } = useUpdateTodo();
  const formik = useFormik<TUpdateTodo>({
    initialValues: newTodo,
    async onSubmit(values) {
      await updateTodo(values);
      closeModal();
    }
  });

  return (
    <Dialog onClose={closeModal} open={isOpen}>
      <ManageTodoForm title="Update Todo" formik={formik} error={updateError} />
    </Dialog>
  );
};
