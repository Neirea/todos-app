import {
  useMutation,
  useQueryClient,
  MutationKey,
  MutationFunction,
  UseMutationOptions
} from 'react-query';

export const useInvalidateMutation = <TData, TVariables>(
  key: MutationKey,
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, unknown, TVariables, unknown>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();
  return useMutation((args: TVariables) => mutationFn(args), {
    ...options,
    onSuccess: () => queryClient.invalidateQueries(key)
  });
};
