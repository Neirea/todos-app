import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useFormik } from 'formik';
import { TCreateTodo } from '../../common/types/todo.type';
import { ManageTodoForm } from './manage-todo-form';
import { useCreateTodo } from '../hooks/create-todo.hook';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const initialValues: TCreateTodo = {
  title: '',
  description: '',
  is_private: false,
  is_completed: false
};

export const CreateTodo = ({ isOpen, closeModal }: Props) => {
  const { mutateAsync: createTodo, error: createError } = useCreateTodo();
  const formik = useFormik<TCreateTodo>({
    initialValues,
    async onSubmit(values) {
      await createTodo(values);
      formik.resetForm();
      closeModal();
    }
  });

  return (
    <Dialog onClose={closeModal} open={isOpen}>
      <ManageTodoForm title="Create Todo" formik={formik} error={createError} />
    </Dialog>
  );
};
