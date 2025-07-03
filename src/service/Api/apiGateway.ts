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
    },

    school: {
        getPageSchool: () => "/schools/" as const,
        add: () => "/schools/" as const,
        update: (schoolId: string) => `/schools/${schoolId}` as const,
        delete: (schoolId: string) => `/schools/${schoolId}` as const,
        getDetailedSchool: (schoolId: string) => `/schools/infos/${schoolId}` as const,
        getFormProgress: () => "/schools/form-progress" as const,
    },

    userSchool: {
        getUserSchools: () => "/user-schools/" as const
    },

    form: {
        general: {
            create: () => `/schools/` as const,
            update: (schoolId: string) => `/schools/${schoolId}` as const,
        },
        academics: {
            create: (schoolId: string) => `/schools/${schoolId}/school-academics/` as const,
            update: (schoolId: string, schoolAcademicsId: string) => `/schools/${schoolId}/school-academics/${schoolAcademicsId}` as const,
        },
        facilities: {
            create: (schoolId: string) => `/schools/${schoolId}/school-facilities/` as const,
            update: (schoolId: string, schoolFacilitiesId: string) => `/schools/${schoolId}/school-facilities/${schoolFacilitiesId}` as const,
        },
        staff: {
            create: (schoolId: string) => `/schools/${schoolId}/school-staff/` as const,
            update: (schoolId: string, schoolStaffId: string) => `/schools/${schoolId}/school-staff/${schoolStaffId}` as const,
        },
        media: {
            create: (schoolId: string) => `/schools/${schoolId}/school-media/` as const,
            update: (schoolId: string, schoolMediaId: string) => `/schools/${schoolId}/school-media/${schoolMediaId}` as const,
        },
    }

}




export default apiGateway;