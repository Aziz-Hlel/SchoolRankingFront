import { useMutation, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query"

interface SafeAsyncMutateOptions<TData, TError, TVariables> extends UseMutationOptions<TData, TError, TVariables> {}

interface SafeAsyncMutateResult<TVariables> {
    safeMutation: (data: TVariables) => void;
    isPending: boolean;
}

export const useSafeAsyncMutate = <TData, TError, TVariables>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    options?: SafeAsyncMutateOptions<TData, TError, TVariables>
): SafeAsyncMutateResult<TVariables> => {

    const { mutateAsync, isPending }: UseMutationResult<TData, TError, TVariables> = useMutation<TData, TError, TVariables>({ mutationFn, ...options });

    const safeMutation = (data: TVariables): void => {
        mutateAsync(data);
    }

    return { safeMutation, isPending };
}
