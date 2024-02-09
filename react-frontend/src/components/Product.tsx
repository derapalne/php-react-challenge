"use client";
import { Product as IProduct } from "@/interfaces/Product";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Category from "./Category";
import { Category as ICategory } from "@/interfaces/Category";

const fetchProductData = async (id: number) => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}api/products/${id}`);
    const jsonResponse = await response.json();
    return jsonResponse;
};

export default function Product() {
    const id = parseInt(usePathname().split("/")[2]);

    const [product, setProduct] = useState<IProduct>();


    useEffect(() => {
        async function getProductData() {
            const productData = await fetchProductData(id);
            setProduct(productData);
        }
        getProductData();
    }, [id]);

    if (!product) return <div>No Product found!</div>;

    const category: ICategory = {
        id: product.category_id ? product.category_id : 0,
        name: product.category_name,
    };

    return (
        <div className="mt-8 w-full">
            <div className="grid grid-cols-5">
                <div className="col-span-3">
                    <Image
                        src={`${process.env["NEXT_PUBLIC_BACKEND_URL"]}storage/${product.image_url}`}
                        unoptimized={true}
                        alt={product.title}
                        width={500}
                        height={500}
                        className="w-96 h-96 p-2 mx-auto object-contain rounded"
                    />
                </div>
                <div className="col-span-2 pr-8">
                    <h3 className="font-bold text-4xl">{product.title}</h3>
                    <p className="mt-4">{product.description}</p>
                    <ul className="flex justify-end">
                        <Category
                            params={{
                                category: category,
                                selectedCategory: '',
                                unlinked: true
                            }}
                        />
                    </ul>
                    <p className="mt-4 mr-8 font-bold text-end">${product.price}</p>
                    <div className="w-full">
                        <button className="mx-auto mt-8 px-4 py-2 rounded-md text-white bg-slate-800 hover:bg-slate-900">
                            Buy Product (Not working)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
