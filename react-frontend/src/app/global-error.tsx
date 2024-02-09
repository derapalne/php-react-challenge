"use client";

import Header from "@/components/Header";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body className={`${raleway.className} bg-slate-800`}>
                <Header />
                <main className="flex min-h-screen w-9/12 bg-slate-100 text-slate-950 mx-auto flex-col items-center pb-12">
                    <h2 className="text-3xl text-center mt-16">Something went wrong!</h2>
                    <button
                        className="px-4 py-2 rounded-md text-white bg-slate-800 hover:bg-slate-900"
                        onClick={() => reset()}
                    >
                        Try again
                    </button>
                </main>
            </body>
        </html>
    );
}
