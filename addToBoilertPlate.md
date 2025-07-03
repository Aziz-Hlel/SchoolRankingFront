

- add queryParams object and type to the object params of useApi for better readability

- add optional validation with zod in the api level chechking the type you entered to the function and the type receive in the response body

- add a safeAsyncMutate function that wraps the try catch of mutateAsync from useMutation and sends back the response without needing to catch the error every time use call mutateAsync

- add authorized routes on top the authenticated one 

- add a page object containing all pages details like paths, button names, and use Context and custom hook like in this one  

- add zustand