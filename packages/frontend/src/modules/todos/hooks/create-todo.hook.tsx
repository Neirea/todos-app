import todoService from '../../../service/todo.service';
import { isAuthError } from '../../auth/error-boundary/is-auth-error.util';
import { APP_KEYS } from '../../common/consts';
import { useInvalidateMutation } from '../../common/hooks/invalidate-mutation.hook';

export const useCreateTodo = () =>
  useInvalidateMutation([APP_KEYS.QUERY_KEYS.TODOS], todoService.create.bind(todoService), {
    useErrorBoundary: (error) => isAuthError(error)
  });
