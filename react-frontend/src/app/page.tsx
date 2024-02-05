import ProductList from "@/components/ProductList";

export default function Home() {
    return (
        <main className="flex min-h-screen w-9/12 bg-slate-100 text-slate-950 mx-auto flex-col items-center pb-12">
            <div className="w-full bg-slate-900 text-center p-8 text-white">
                <h1 className="mb-4 text-4xl ">BSmart Product Shop</h1>
                <span>Where you can buy all you want</span>
            </div>
            <ProductList />
        </main>
    );
}
