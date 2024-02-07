"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const postFormData = async (email: string, password: string) => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}api/auth/login`, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
};

export default function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [warningText, setWarningText] = useState("");

    function handleEmailChange(ev: React.FormEvent<HTMLInputElement>) {
        setEmail(ev.currentTarget.value);
    }

    function handlePasswordChange(ev: React.FormEvent<HTMLInputElement>) {
        setPassword(ev.currentTarget.value);
    }

    async function handleSignupButtonClick(ev: React.FormEvent<HTMLButtonElement>) {
        ev.preventDefault();
        const userData = await postFormData(email, password);
        if (userData.error) {
            const text = userData.error[0];
            return setWarningText(text);
        }
        if (userData.success) {
            Cookies.set("user_data", JSON.stringify(userData.user));
            Cookies.set("access_token", JSON.stringify(userData.token));
            router.push("/");
        }
    }

    return (
        <form className="mt-4 p-8 border">
            <div className="grid grid-cols-4 py-2">
                <label htmlFor="email">Email</label>
                <input
                    className="ml-4 col-span-3 bg-slate-100 border border-transparent border-b-slate-300"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className="grid grid-cols-4 py-2">
                <label htmlFor="password">Password</label>
                <input
                    className="ml-4 col-span-3 bg-slate-100 border border-transparent border-b-slate-300"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <p className="text-center mt-4 mx-auto text-red-700">{warningText}</p>
            <div className="text-center mt-4">
                <button
                    className="px-4 py-2 rounded-md text-white bg-slate-800 hover:bg-slate-900"
                    onClick={handleSignupButtonClick}
                >
                    Log In
                </button>
            </div>
        </form>
    );
}
