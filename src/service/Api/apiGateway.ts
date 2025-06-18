import ENV from "../../utils/env.variables";



const apiGateway = {

    baseUrl: ENV.BASE_URL,

    auth: {
        me: "/user/me" as const, // * when talking to chat it advise you to do them this way, look into it,  me: () => "/user/me" as const, 
        login: "/auth/login",
        refresh: "/auth/refresh",
        signUp: "/users/",
    },


    user: {
        getPageUser: "/users/",
        add: "/users/",
        update: (userId: string) => `/users/${userId}` as const,
        delete: (userId: string) => `/users/${userId}` as const,
    }

}




export default apiGateway;