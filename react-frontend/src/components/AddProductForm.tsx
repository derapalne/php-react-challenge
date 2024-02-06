"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'

const fetchCategories = async () => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/categories/`);
    const jsonResponse = await response.json();
    return jsonResponse;
};

const submitProduct = async (
    product: { title: string; description: string; image?: File; price: number; category: string },
    accessToken: string
) => {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("category", product.category);
    if (product.image) formData.append("image", product.image);
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken.replaceAll('"','')}`,
        },
        body: formData,
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
};

export default function AddProductForm() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [image, setImage] = useState<File>();

    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const accessTokenCookie = Cookies.get("access_token");
        if (accessTokenCookie) setAccessToken(accessTokenCookie);
    }, []);

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

    function handleCategoryChange(ev: React.FormEvent<HTMLInputElement>) {
        setCategory(ev.currentTarget.value);
    }

    function handlImageChange(ev: React.FormEvent<HTMLInputElement>) {
        const images = ev.currentTarget.files;
        if (!images) return;
        const image = images.item(0);
        if (image) setImage(image);
    }

    async function handleSubmitButtonClick(ev: React.FormEvent<HTMLButtonElement>) {
        ev.preventDefault();
        const jsonResponse = await submitProduct(
            {
                title: title,
                description: description,
                price: price,
                image: image,
                category: category,
            },
            accessToken
        );
        if (jsonResponse.status === 500 || jsonResponse.status === 401 || jsonResponse.error) {
            const text = jsonResponse.error ? jsonResponse.error[0] : jsonResponse.message;
            return setWarningText(text);
        }
        setWarningText("");
        toast('Product Added!');
        router.push("/");
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
                <input
                    className="ml-4 col-span-3 bg-slate-100 border border-transparent border-b-slate-300"
                    type="text"
                    name="category"
                    placeholder="Product Category"
                    value={category}
                    onChange={handleCategoryChange}
                />
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
                    onClick={handleSubmitButtonClick}
                >
                    Add Product
                </button>
            </div>
            <ToastContainer />
        </form>
    );
}
