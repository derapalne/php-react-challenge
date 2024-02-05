"use client";
import { useEffect, useState } from "react";
import ProductForList from "./ProductForList";
import { Product } from "@/interfaces/Product";
import Paginator from "./Paginator";

const fetchProducts = async (
    url: string = `${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products`
) => {
    const products = await fetch(url);
    const jsonProducts = await products.json();
    console.log(jsonProducts);
    return jsonProducts;
};

export default function ProductList() {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>();
    const [prevPageUrl, setPrevPageUrl] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [nextPageUrl, setNextPageUrl] = useState("");

    useEffect(() => {
        async function getProducts() {
            const fetchedProducts = await fetchProducts();
            console.log(fetchedProducts);
            setProducts(fetchedProducts.data);
            setPrevPageUrl(fetchedProducts.prev_page_url);
            setNextPageUrl(fetchedProducts.next_page_url);
            setCurrentPage(fetchedProducts.current_page);
            setLastPage(fetchedProducts.last_page);
            setIsLoading(false);
        }
        getProducts();
    }, []);

    async function fetchPrevPageProducts() {
        setIsLoading(true);
        const fetchedProducts = await fetchProducts(prevPageUrl);
        console.log(fetchedProducts);
        setProducts(fetchedProducts.data);
        setPrevPageUrl(fetchedProducts.prev_page_url);
        setNextPageUrl(fetchedProducts.next_page_url);
        setCurrentPage(fetchedProducts.current_page);
        setLastPage(fetchedProducts.last_page);
        if (fetchedProducts) setIsLoading(false);
    }

    async function fetchNextPageProducts() {
        setIsLoading(true);
        const fetchedProducts = await fetchProducts(nextPageUrl);
        console.log(fetchedProducts);
        setProducts(fetchedProducts.data);
        setPrevPageUrl(fetchedProducts.prev_page_url);
        setNextPageUrl(fetchedProducts.next_page_url);
        setCurrentPage(fetchedProducts.current_page);
        setLastPage(fetchedProducts.last_page);
        if (fetchedProducts) setIsLoading(false);
    }

    if (isLoading)
        return (
            <div className="grid grid-cols-4 gap-2 p-2 text-slate-950">
                <p className="col-span-4 mt-8">Loading Products...</p>
            </div>
        );

    if (!products)
        return (
            <div className="grid grid-cols-4 gap-2 p-2 text-slate-950">
                <p className="col-span-4 mt-8">No products found!</p>
            </div>
        );

    return (
        <>
            <div className="grid grid-cols-4 gap-2 p-2 text-slate-950">
                {products.map((p) => (
                    <ProductForList key={p.id} params={p} />
                ))}
            </div>
            <div className="p-2 w-full">
                <Paginator
                    params={{
                        currentPage: currentPage,
                        lastPage: lastPage,
                        prevPageAction: fetchPrevPageProducts,
                        nextPageAction: fetchNextPageProducts,
                    }}
                />
            </div>
        </>
    );
}
