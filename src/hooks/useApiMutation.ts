import { useMutation, useQueryClient, type DefaultError, type MutationFunction } from "@tanstack/react-query";

interface useApiMutationProps<TData, TVariables> {
    mutationFn: MutationFunction<TData, TVariables>;
    queryKey?: string[];
    queriesKeys?: string[][];

}



const useApiMutation = <TData, TVariables>({ mutationFn, queryKey, queriesKeys }: useApiMutationProps<TData, TVariables>) => {

    const queryClient = useQueryClient();


    const { mutateAsync, isPending } = useMutation({
        mutationFn,
        onSuccess: async () => {
            if (queryKey) {
                await queryClient.invalidateQueries({ queryKey: queryKey, });
                // await queryClient.refetchQueries({ queryKey: queryKey, }); // ? this shit make query refetch again, the ones above already does that 
            }
            if (queriesKeys) {
                for (const queryKey of queriesKeys) {
                    await queryClient.invalidateQueries({ queryKey: queryKey, });
                    // await queryClient.refetchQueries({ queryKey: queryKey, });
                }
            }
        },
    });


    const safeAsyncMutate = async (data: TVariables): Promise<Awaited<TData>> => {

        try {

            const response = await mutateAsync(data);

            return response

        } catch (error) {
            return error
        }
    }


    return { safeAsyncMutate, isPending };


}
export default useApiMutation;