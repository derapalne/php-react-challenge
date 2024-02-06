import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";

export default function Login() {
    return (
        <>
            <Header />
            <main className="flex min-h-screen w-9/12 bg-slate-100 text-slate-950 mx-auto flex-col items-center pb-12">
                <LoginForm />
            </main>
        </>
    );
}
