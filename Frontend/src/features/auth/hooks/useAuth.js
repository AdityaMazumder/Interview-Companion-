import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { getMe, login as loginApi, logout as logoutApi } from "../services/auth.api";

export function useAuth() {
    const { user, setUser, loading, setLoading } = useContext(AuthContext);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const data = await getMe();

                if (data?.user) {
                    setUser(data.user);
                }
            } finally {
                // A 401 means the user is simply not logged in.
                setLoading(false);
            }
        };

        checkUser();
    }, [setLoading, setUser]);

    const handleLogin = async (credentials) => {
        setLoading(true);

        try {
            const data = await loginApi(credentials);

            if (!data?.user) {
                throw new Error("Login failed");
            }

            setUser(data.user);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logoutApi();
        setUser(null);
    };

    return {
        user,
        loading,
        handleLogin,
        handleLogout,
    };
}