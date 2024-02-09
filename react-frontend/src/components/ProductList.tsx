"use client";
import { useEffect, useState } from "react";
import ProductForList from "./ProductForList";
import { Product } from "@/interfaces/Product";
import Paginator from "./Paginator";
import { Category as ICategory } from "@/interfaces/Category";
import Category from "./Category";
import Cookies from "js-cookie";
import { UserData as IUserData } from "@/interfaces/UserData";
import CategoryEditor from "./CategoryEditor";

const orderFilters = [
    { text: "Cheapest", filter: "price" },
    { text: "Most Expensive", filter: "price DESC" },
    { text: "Newest", filter: "created_at DESC" },
];

const fetchProducts = async (
    url: string = `${process.env["NEXT_PUBLIC_BACKEND_URL"]}api/products?`,
    orderBy?: string,
    category?: string
) => {
    const products = await fetch(
        `${url}${orderBy ? `order=${orderBy}&` : ""}${category ? `category=${category}&` : ""}`
    );
    const jsonProducts = await products.json();
    return jsonProducts;
};

const fetchCategories = async () => {
    const cateogries = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}api/categories`);
    const jsonCategories = await cateogries.json();
    return jsonCategories;
};

export default function ProductList() {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>();
    const [categories, setCategories] = useState<ICategory[]>();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [prevPageUrl, setPrevPageUrl] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [nextPageUrl, setNextPageUrl] = useState("");
    const [orderBy, setOrderBy] = useState("");
    const [userData, setUserData] = useState<IUserData>();

    function refreshProducts(fetchedProducts: any) {
        setProducts(fetchedProducts.data);
        setPrevPageUrl(fetchedProducts.prev_page_url);
        setNextPageUrl(fetchedProducts.next_page_url);
        setCurrentPage(fetchedProducts.current_page);
        setLastPage(fetchedProducts.last_page);
    }

    useEffect(() => {
        async function getProducts() {
            const fetchedProducts = await fetchProducts();
            refreshProducts(fetchedProducts);
            setIsLoading(false);
        }
        getProducts();
        async function getCategories() {
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories);
        }
        getCategories();
        const udCookie = Cookies.get("user_data");
        if (udCookie) setUserData(JSON.parse(udCookie));
    }, []);

    async function fetchPrevPageProducts() {
        setIsLoading(true);
        const fetchedProducts = await fetchProducts(prevPageUrl + "&", orderBy);
        refreshProducts(fetchedProducts);
        if (fetchedProducts) setIsLoading(false);
    }

    async function fetchNextPageProducts() {
        setIsLoading(true);
        const fetchedProducts = await fetchProducts(nextPageUrl + "&", orderBy);
        refreshProducts(fetchedProducts);
        if (fetchedProducts) setIsLoading(false);
    }

    async function fetchOrderedProducts(order: string) {
        if (orderBy === order) setOrderBy("");
        else setOrderBy(order);
        setIsLoading(true);
        const fetchedProducts = await fetchProducts(
            undefined,
            orderBy === order ? "" : order,
            selectedCategory
        );
        refreshProducts(fetchedProducts);
        if (fetchedProducts) setIsLoading(false);
    }

    async function fetchProductsFilteredByCategory(category: string) {
        if (selectedCategory === category) setSelectedCategory("");
        else setSelectedCategory(category);
        setIsLoading(true);
        const fetchedProducts = await fetchProducts(
            undefined,
            orderBy,
            selectedCategory === category ? "" : category
        );
        refreshProducts(fetchedProducts);
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
            <div className="grid grid-cols-6 w-full p-4">
                <span className="text-right">Sort by:</span>
                <ul className="col-span-5 flex">
                    {orderFilters.map((f) => (
                        <li
                            key={f.text}
                            className={`mx-2 px-1 ${
                                orderBy === f.filter ? "bg-slate-400" : "bg-slate-200"
                            } rounded-md hover:bg-slate-300 cursor-pointer`}
                            onClick={() => fetchOrderedProducts(f.filter)}
                        >
                            {f.text}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grid grid-cols-6 w-full p-4 border-2 border-transparent border-b-slate-300">
                <span className="text-right">Filter by Category:</span>
                <ul className="col-span-5 flex flex-wrap">
                    {categories?.map((c) => (
                        <Category
                            key={c.id}
                            params={{
                                category: c,
                                selectedCategory: selectedCategory,
                                onClickHandler: fetchProductsFilteredByCategory,
                            }}
                        />
                    ))}
                    {categories && userData && <CategoryEditor currentCategories={categories} />}
                </ul>
            </div>
            <div className="grid grid-cols-4 gap-2 p-2 text-slate-950">
                {products.map((p) => (
                    <ProductForList key={p.id} params={p} activeUserId={userData?.id} />
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
