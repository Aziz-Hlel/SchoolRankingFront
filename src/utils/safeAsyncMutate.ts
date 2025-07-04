import type { UseMutateAsyncFunction } from "@tanstack/react-query";



const safeAsyncMutate = async <TResponse, TData>(mutateAsync: UseMutateAsyncFunction<TResponse, Error, TData, unknown>, data: TData) => {

    try {

        const response = await mutateAsync(data).then((res) => res);

        return response

    } catch (error) {
        return error as TResponse;
    }


}


export default safeAsyncMutate;