"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Category as ICategory } from "@/interfaces/Category";
import Category from "./Category";
import CategoryAdder from "./CategoryAdder";
import { Product } from "@/interfaces/Product";

const fetchProductData = async (id: number) => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}api/products/${id}`);
    const jsonResponse = await response.json();
    return jsonResponse;
};

const fetchCategories = async () => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}api/categories/`);
    const jsonResponse = await response.json();
    return jsonResponse;
};

const submitProduct = async (
    product: {
        id: number;
        title: string;
        description: string;
        image?: File;
        price: number;
        categoryName: string;
    },
    accessToken: string
) => {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("category", product.categoryName);
    if (product.image) formData.append("image", product.image);

    const response = await fetch(
        `${process.env["NEXT_PUBLIC_BACKEND_URL"]}api/products/${product.id}?_method=PUT`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken.replaceAll('"', "")}`,
            },
            body: formData,
        }
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
};

const deleteProduct = async (productId: number, accessToken: string) => {
    const response = await fetch(
        `${process.env["NEXT_PUBLIC_BACKEND_URL"]}api/products/${productId}?_method=DELETE`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken.replace('"', "")}`,
            },
        }
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
};

export default function EditProductForm() {
    const router = useRouter();

    const id = parseInt(usePathname().split("/")[3]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [categoryName, setCategoryName] = useState("");
    const [image, setImage] = useState<File>();

    const [categories, setCategories] = useState<ICategory[]>();

    const [buttonText, setButtonText] = useState("Save Changes");

    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const atCookie = Cookies.get("access_token");
        if (atCookie) setAccessToken(atCookie.replace('"', ""));
        async function getCategories() {
            const categories = await fetchCategories();
            setCategories(categories);
        }
        getCategories();
        async function getProductData() {
            const productData: Product = await fetchProductData(id);
            setTitle(productData.title);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategoryName(productData.category_name);
        }
        getProductData();
    }, [id]);

    const [warningText, setWarningText] = useState("");

    function handleTitleChange(ev: React.FormEvent<HTMLInputElement>) {
        setTitle(ev.currentTarget.value);
    }

    function handleDescriptionChange(ev: React.FormEvent<HTMLTextAreaElement>) {
        setDescription(ev.currentTarget.value);
    }

    function handlePriceChange(ev: React.FormEvent<HTMLInputElement>) {
        setPrice(parseInt(ev.currentTarget.value));
    }

    function handleCategoryNameChange(categoryName: string) {
        setCategoryName(categoryName);
    }

    function handlImageChange(ev: React.FormEvent<HTMLInputElement>) {
        const images = ev.currentTarget.files;
        if (!images) return;
        const image = images.item(0);
        if (image) setImage(image);
    }

    async function handleAddProductButtonClick(ev: React.FormEvent<HTMLButtonElement>) {
        ev.preventDefault();
        setButtonText("Saving Changes...");
        const jsonResponse = await submitProduct(
            {
                id: id,
                title: title,
                description: description,
                price: price,
                categoryName: categoryName,
                image: image,
            },
            accessToken
        );
        if (jsonResponse.error) {
            const text =
                typeof jsonResponse.error === "string" ? jsonResponse.error : jsonResponse.error[0];
            return setWarningText(text);
        }
        if (jsonResponse.success) {
            setButtonText("Product Updated!");
            router.push("/");
        }
        if (jsonResponse.status === 500 || jsonResponse.status === 403 || jsonResponse.error) {
            setWarningText(jsonResponse.message);
        }
        setWarningText("");
    }

    async function handleDeleteProductButtonClick(ev: React.FormEvent<HTMLButtonElement>) {
        ev.preventDefault();
        setButtonText("Deleting Product...");
        const jsonResponse = await deleteProduct(id, accessToken);
        if (jsonResponse.error) {
            const text =
                typeof jsonResponse.error === "string" ? jsonResponse.error : jsonResponse.error[0];
            return setWarningText(text);
        }
        if (jsonResponse.success) {
            setButtonText("Product Deleted!");
            router.push("/");
        }
        if (jsonResponse.status === 500 || jsonResponse.status === 403 || jsonResponse.error) {
            setWarningText(jsonResponse.message);
        }
        setWarningText("");
    }

    function handleAddNewCategory(name: string) {
        setCategoryName(name);
        categories?.push({ id: 0, name: name });
        setCategories(categories);
    }

    return (
        <form className="mt-4 p-8 border">
            <div className="grid grid-cols-4 py-2">
                <label htmlFor="title">Title:</label>
                <input
                    className="ml-4 col-span-3 bg-slate-100 border border-transparent border-b-slate-300"
                    type="text"
                    name="title"
                    placeholder="Product Title"
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <div className="grid grid-cols-4 py-2">
                <label htmlFor="description">Description</label>
                <textarea
                    className="ml-4 col-span-3 bg-slate-100 border border-transparent border-b-slate-300"
                    name="description"
                    rows={3}
                    placeholder="Product description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </div>
            <div className="grid grid-cols-4 py-2">
                <label htmlFor="price">Price</label>
                <input
                    className="ml-4 col-span-3 bg-slate-100 border border-transparent border-b-slate-300"
                    type="number"
                    name="price"
                    placeholder=""
                    value={price}
                    onChange={handlePriceChange}
                />
            </div>
            <div className="grid grid-cols-4 py-2">
                <label htmlFor="category">Category</label>
                <ul className="col-span-3 flex flex-wrap">
                    {categories?.map((c) => (
                        <Category
                            key={c.id}
                            params={{
                                category: c,
                                selectedCategory: categoryName,
                                onClickHandler: handleCategoryNameChange,
                            }}
                        />
                    ))}

                    <CategoryAdder handleAddNewCategory={handleAddNewCategory}></CategoryAdder>
                </ul>
            </div>
            <div className="my-4 grid grid-cols-2">
                <label className="text-end mx-4" htmlFor="image_url">
                    Image:
                </label>
                <input
                    className="ml-4 col-span-3 bg-slate-100 border border-transparent border-b-slate-300"
                    name="image"
                    type="file"
                    placeholder="Product Image (URL)"
                    accept="image/*"
                    onChange={handlImageChange}
                />
            </div>
            <p className="text-center mt-4 mx-auto text-red-700">{warningText}</p>
            <div className="text-center mt-4">
                <button
                    className="px-4 py-2 rounded-md text-white bg-slate-800 hover:bg-slate-900"
                    onClick={handleAddProductButtonClick}
                >
                    {buttonText}
                </button>
            </div>
            <div className="text-center mt-4">
                <button
                    className="px-4 py-2 rounded-md hover:text-white bg-slate-100 border-2 border-red-600 hover:bg-slate-900"
                    onClick={handleDeleteProductButtonClick}
                >
                    !! Delete Product !!
                </button>
            </div>
        </form>
    );
}
