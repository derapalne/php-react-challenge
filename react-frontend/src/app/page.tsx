import ProductForList from "@/components/ProductForList";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen w-9/12 bg-slate-800 mx-auto flex-col items-center">
            <div className="w-full bg-slate-900 text-center p-8">
                <h1 className="mb-4 text-4xl ">BSmart Product Shop</h1>
                <div>Listing All Products</div>
            </div>
            <ProductList />
        </main>
    );
}
