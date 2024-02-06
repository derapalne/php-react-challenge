"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Header() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const cookieData = Cookies.get("user_data");
        if (cookieData) setUsername(JSON.parse(cookieData).name);
    }, []);

    return (
        <header className="w-9/12 mx-auto bg-slate-900 text-center p-8 text-white">
            <Link href="/" className="mb-1 text-4xl ">
                BSmart Product Shop
            </Link>
            <br />
            <span className="mb-2">Where you can buy all you want</span>
            <ul className="flex font-bold mt-2 mx-auto justify-around w-6/12">
                {username === "" ? (
                    <>
                        <li className="hover:underline">
                            <Link href="sign-up">Sign Up</Link>
                        </li>
                        <li className="hover:underline">
                            <Link href="login">Login</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="font-normal">Hello, {username}</li>
                        <li className="hover:underline">
                            <Link href="add-product">Add Product</Link>
                        </li>
                        <li className="hover:underline">
                            <Link href="logout">Logout</Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
}
