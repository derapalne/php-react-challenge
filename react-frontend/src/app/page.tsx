import Header from "@/components/Header";
import ProductList from "@/components/ProductList";

export default function Home() {
    return (
        <>
            <Header />
            <main className="flex min-h-screen w-9/12 bg-slate-100 text-slate-950 mx-auto flex-col items-center pb-12">
                <ProductList />
            </main>
        </>
    );
}
