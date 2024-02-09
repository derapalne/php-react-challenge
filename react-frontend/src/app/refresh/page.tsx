"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RefreshPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/");
    }, [router]);

    return (
        <>
            <Header />
            <main className="flex min-h-screen w-9/12 bg-slate-100 text-slate-950 mx-auto flex-col items-center pb-12"></main>
        </>
    );
}
