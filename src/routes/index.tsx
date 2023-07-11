import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import supabase from "../helpers/supabaseClient";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export default function Routes() {
    const { user, setUser, fetchData } = useContext(GlobalContext);

    // Recupera a sessão do usuário quando o app é recarregado ou aberto novamente.
    useEffect(() => {
        const refreshSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data && data.session) {
                setUser(data.session.user);
                fetchData(data.session.user.id);
            }
        };
        refreshSession();
    }, [setUser, fetchData]);

    return (
        <NavigationContainer>
            {user ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}
