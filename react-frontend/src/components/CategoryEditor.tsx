"use client";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import Cookies from "js-cookie";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Category as ICategory } from "@/interfaces/Category";
import EditableCategory from "./EditableCategory";
import { useRouter } from "next/navigation";

const postNewCategory = async (name: string, accessToken: string) => {
    const formFields = new FormData();
    formFields.append("name", name);
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}api/categories`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken.replaceAll('"', "")}`,
        },
        body: formFields,
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
};

export default function CategoryEditor({ currentCategories }: { currentCategories: ICategory[] }) {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [categories, setCategories] = useState(currentCategories);

    useEffect(() => {
        if (!accessToken) {
            const atCookie = Cookies.get("access_token");
            if (atCookie) setAccessToken(atCookie);
        }
    }, [accessToken]);

    function handleNameChange(ev: React.FormEvent<HTMLInputElement>) {
        setName(ev.currentTarget.value);
    }

    async function handleAddButtonClick(ev: React.FormEvent<HTMLButtonElement>) {
        ev.preventDefault();
        if (!name) return;
        const response = await postNewCategory(name, accessToken);
        if (response.error) {
            const text = typeof response.error === "string" ? response.error : response.error[0];
            toast.error(text, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        if (response.success) {
            categories.push(response.category);
            setCategories(categories);
            setName("");
        }
    }

    function handleManageCategoriesButtonClick() {
        setIsOpen(true);
    }

    function handleModalClosing() {
        router.push("refresh");
        setIsOpen(false);
    }

    return (
        <>
            <li
                className={`m-2 mt-0 px-1 bg-slate-300 rounded-md hover:bg-slate-400 cursor-pointer`}
                onClick={handleManageCategoriesButtonClick}
            >
                Manage Categories
            </li>
            <Modal isOpen={isOpen} onClose={handleModalClosing} hasCloseButton={true}>
                <div>
                    <ul>
                        {categories.map((c) => (
                            <EditableCategory key={c.id} params={{ category: c }} />
                        ))}
                    </ul>
                    <div className="grid grid-cols-5 py-2">
                        <label className="col-span-1 m-auto" htmlFor="title">
                            Add Category:
                        </label>
                        <input
                            className="ml-4 col-span-3 bg-slate-100 border border-transparent border-b-slate-300"
                            type="text"
                            name="name"
                            placeholder="Category Name"
                            value={name}
                            onChange={handleNameChange}
                        />
                        <button
                            className="col-span-1 mx-2 px-4 py-2 rounded-md text-white bg-slate-800 hover:bg-slate-900"
                            onClick={handleAddButtonClick}
                        >
                            Add
                        </button>
                    </div>
                </div>
                <ToastContainer />
            </Modal>
        </>
    );
}
