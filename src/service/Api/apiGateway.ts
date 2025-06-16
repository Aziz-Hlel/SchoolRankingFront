import ENV from "../../utils/env.variables";



const apiGateway = {

    baseUrl: ENV.BASE_URL,

    auth: {
        me: "/user/me" as const, // * when talking to chat it advise you to do them this way, look into it,  me: () => "/user/me" as const, 
        login: "/auth/login",
        refresh: "/auth/refresh",
        signUp: "/users/",
    },

    services: {
        emailContactUs: "/services/email/contact-us",
        emailProperty: "/services/email/property",
    },

    images: ENV.BASE_URL + "/images/",

    getSignedUrl: ENV.BASE_URL + "/images/getSignedUrl",

}




export default apiGateway;