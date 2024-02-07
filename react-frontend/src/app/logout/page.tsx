"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";

const logout = async (accessToken: string) => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/api/auth/logout`, {
        method: "post",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const jsonResponse = response.json();
    return jsonResponse;
};

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        const accessToken = Cookies.get("access_token");
        if (accessToken) logout(accessToken);
        Cookies.remove("access_token");
        Cookies.remove("user_data");
        router.push("/");
    }, []);
}
