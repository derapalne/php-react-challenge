"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const fetchCategories = async () => {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/categories/`);
    const jsonResponse = await response.json();
    return jsonResponse;
};

const submitProduct = async (
    product: { title: string; description: string; image: File; price: number; category: string },
    accessToken: string,
    setWarningMessage: Function
) => {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("category", product.category);
    formData.append("image", product.image);

    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/Json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    if (jsonResponse.status === 500 || jsonResponse.status === 403 || !jsonResponse.id) {
        setWarningMessage(jsonResponse.message);
        return false;
    }

    setWarningMessage("");
    return true;
};

export default function AddProductForm() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState<File>();

    const [warningText, setWarningText] = useState("");

    function handleUsernameChange(ev: React.FormEvent<HTMLInputElement>) {
        setUsername(ev.currentTarget.value);
    }

    function handleDescriptionChange(ev: React.FormEvent<HTMLTextAreaElement>) {
        setDescription(ev.currentTarget.value);
    }

    function handlePasswordChange(ev: React.FormEvent<HTMLInputElement>) {
        setPassword(ev.currentTarget.value);
    }

    function handleConfirmPasswordChange(ev: React.FormEvent<HTMLInputElement>) {
        setConfirmPassword(ev.currentTarget.value);
        if (password !== ev.currentTarget.value && ev.currentTarget.value !== "")
            setWarningText("Passwords do not match!");
        else setWarningText("");
    }

    function handlImageChange(ev: React.FormEvent<HTMLInputElement>) {
        const images = ev.currentTarget.files;
        if (!images) return;
        const image = images.item(0);
        if (image) setImage(image);
    }

    // async function handleSignupButtonClick(ev: React.FormEvent<HTMLButtonElement>) {
    //     ev.preventDefault();
    //     const userData = await postFormData(username, email, password, confirmPassword);
    //     if (userData.error) {
    //         const text = userData.error[0];
    //         return setWarningText(text);
    //     }
    //     if (userData.success) {
    //         Cookies.set("user_data", JSON.stringify(userData.user));
    //         Cookies.set("access_token", JSON.stringify(userData.token));
    //         router.push("/");
    //     }
    // }

    return (
        <form className="mt-4 p-8 border">
            <div className="grid grid-cols-4 py-2">
                <label htmlFor="username">Title:</label>
                <input
                    className="ml-4 col-span-3 bg-slate-100 border border-transparent border-b-slate-300"
                    type="text"
                    name="username"
                    placeholder="Product Title"
                    value={username}
                    onChange={handleUsernameChange}
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
                <label htmlFor="password">Price</label>
                <input
                    className="ml-4 col-span-3 bg-slate-100 border border-transparent border-b-slate-300"
                    type="number"
                    name="price"
                    placeholder=""
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div className="grid grid-cols-4 py-2">
                <label htmlFor="category">Category</label>
                <input
                    className="ml-4 col-span-3 bg-slate-100 border border-transparent border-b-slate-300"
                    type="text"
                    name="category"
                    placeholder="Product Category"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
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
                    // onClick={handleSignupButtonClick}
                >
                    Add Product
                </button>
            </div>
        </form>
    );
}
