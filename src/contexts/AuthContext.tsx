import { createContext, useState, useEffect, useContext } from "react";
import apiGateway from "../service/Api/apiGateway";
import { apiService, type ApiResponse } from "../service/Api/apiService";
import type { signUpSchema } from "../schemas/signUpSchema";
import type { sigInSchema } from "../schemas/signInSchema";
import { jwtTokenManager } from "../service/token/JwtTokenManager.class";
import type { SigInApiResponse, SignUpApiResponse } from "../types/Apis/auth";
import type { User } from "../types/user";




type IAuthContext = {
    user: User | null | undefined;
    isLoading: boolean;
    signup: (data: signUpSchema) => Promise<ApiResponse<SignUpApiResponse>>;
    login: (data: sigInSchema) => Promise<ApiResponse<SigInApiResponse>>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {



    const [user, setUser] = useState<User | null | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const getCurrentUser = async () => {
        const response = await apiService.get<User>(apiGateway.auth.me);
        return response
    };


    const whoAmI = async () => {

        const response = await getCurrentUser();
        response.success ? setUser(response.data) : setUser(null);

    }


    useEffect(() => {
        const initializeAuth = async () => {
            try {
                console.log("ousll useffect");

                // Load tokens from localStorage
                jwtTokenManager.loadTokensFromStorage();

                if (!jwtTokenManager.refreshTokenExist()) {
                    setUser(null);
                    setIsLoading(false);
                    return;
                }

                else {
                    // Try to get user profile to verify token is still valid
                    const refreshToken = jwtTokenManager.getRefreshToken();


                    const response = await apiService.post<{ accessToken: string, refreshToken: string }>(apiGateway.auth.refresh, { refreshToken });

                    if (response.success) {
                        jwtTokenManager.setTokens(response.data.accessToken, response.data.refreshToken);

                        const userResponse = await getCurrentUser();

                        userResponse.success ? setUser(userResponse.data) : setUser(null);



                    } else {
                        // Token invalid, clear it
                        setUser(null);
                        jwtTokenManager.clearTokens();
                    }

                    setIsLoading(false);
                }


            } catch (error) {
                console.error('Auth initialization error:', error);
                setUser(null);
                setIsLoading(false);
                jwtTokenManager.clearTokens();
            }
        };

        initializeAuth();
    }, []);



    const signup = async (data: signUpSchema) => {

        setIsLoading(true);

        const response = await apiService.post<SignUpApiResponse>(apiGateway.auth.signUp, data);

        if (response.success) {
            const { accessToken, refreshToken, user } = response.data
            jwtTokenManager.setTokens(accessToken, refreshToken);
            setUser(user)
        }

        else setUser(null);

        setIsLoading(false);

        return response

    }

    const login = async (data: sigInSchema) => {

        setIsLoading(true);

        const response = await apiService.post<SigInApiResponse>(apiGateway.auth.login, data);

        if (response.success) {
            const { accessToken, refreshToken, user } = response.data
            jwtTokenManager.setTokens(accessToken, refreshToken);

            setUser(user)

        }

        setIsLoading(false);

        return response
    };

    const logout = async () => {

        setUser(null);
        jwtTokenManager.clearTokens();

    };

    const contextValue: IAuthContext = {
        user,
        isLoading,
        signup,
        login,
        logout,
        refreshUser: whoAmI,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}