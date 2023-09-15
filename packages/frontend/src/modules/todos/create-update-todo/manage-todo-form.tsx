import React from 'react';
import { FormikProps } from 'formik';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TCreateTodo, TTodoBoolean } from '../../common/types/todo.type';
import * as Styled from './create-update-todo.styled';
import { Toggler } from '../../common/components/toggler';
import { getErrorMessage } from '../../common/utils/error-message.util';

type Props<T extends TCreateTodo> = {
  title: string;
  formik: FormikProps<T>;
  error: unknown;
};

export const ManageTodoForm = <T extends TCreateTodo>({ title, formik, error }: Props<T>) => {
  const isPrivateField: TTodoBoolean = 'is_private';
  return (
    <Styled.TodoForm onSubmit={formik.handleSubmit}>
      <Typography variant="h5">{title}</Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        multiline
        type="text"
        name="title"
        placeholder="title"
        disabled={formik.isSubmitting}
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        minRows={3}
        type="text"
        name="description"
        placeholder="description"
        disabled={formik.isSubmitting}
        value={formik.values.description}
        onChange={formik.handleChange}
      />
      <Styled.TogglerContainer>
        <Typography color="text.secondary">Is private?</Typography>
        <Toggler
          active={formik.values.is_private}
          disabled={formik.isSubmitting}
          onToggle={() => formik.setFieldValue(isPrivateField, !formik.values.is_private)}
        />
      </Styled.TogglerContainer>
      <Typography color="red">{getErrorMessage(error)}</Typography>
      <Button variant="outlined" type="submit">
        Save
      </Button>
    </Styled.TodoForm>
  );
};
