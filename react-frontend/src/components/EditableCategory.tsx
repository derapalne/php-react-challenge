"use client";
import { Category as ICategory } from "@/interfaces/Category";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const putCategory = async (id: number, name: string, accessToken: string) => {
    const formData = new FormData();
    formData.append("name", name);

    const response = await fetch(
        `${process.env["NEXT_PUBLIC_BACKEND_URL"]}api/categories/${id}?_method=PUT`,
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

const deleteCategory = async (id: number, accessToken: string) => {
    const response = await fetch(
        `${process.env["NEXT_PUBLIC_BACKEND_URL"]}api/categories/${id}?_method=DELETE`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken.replaceAll('"', "")}`,
            },
        }
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
};

export default function EditableCategory({
    params,
}: {
    params: {
        category: ICategory;
    };
}) {
    const [accessToken, setAccessToken] = useState("");
    const [editingName, setEditingName] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState(params.category.name);

    useEffect(() => {
        if (!accessToken) {
            const atCookie = Cookies.get("access_token");
            if (atCookie) setAccessToken(atCookie);
        }
    }, [accessToken]);

    function handleEditClick() {
        setEditingName(true);
    }

    function handleNameChange(ev: React.FormEvent<HTMLInputElement>) {
        setName(ev.currentTarget.value);
    }

    async function handleNameKeyDown(ev: React.KeyboardEvent<HTMLInputElement>) {
        if (ev.code === "Enter") {
            setEditingName(false);
            const response = await putCategory(params.category.id, name, accessToken);
            if (response.success) {
                console.log("success");
            }
        }
    }

    async function handleDeleteClick() {
        if (confirmDelete) {
            const response = await deleteCategory(params.category.id, accessToken);
            if (response.success) {
                setDeleted(true);
                console.log("success");
            }
            return;
        }
        setConfirmDelete(true);
        setShowMessage(true);
        setMessage("This will delete all products in category. Click again to confirm.");
        setTimeout(() => {
            setShowMessage(false);
            setMessage("");
            setConfirmDelete(false);
        }, 5000);
    }

    if (deleted) return <></>;

    return (
        <li className={`m-2 mt-0 px-1 bg-slate-200 rounded-md hover:bg-slate-300 group/category`}>
            <ul className="grid grid-cols-3 mt-4 p-3 hover:py-2">
                {editingName ? (
                    <input
                        className="ml-4 bg-slate-200 border border-transparent border-b-slate-300 group-hover/category:border-b-slate-400 group-hover/category:bg-slate-300"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        onKeyDown={handleNameKeyDown}
                    />
                ) : (
                    <li className="my-auto">{name}</li>
                )}
                <li
                    className="hidden group-hover/category:block cursor-pointer bg-orange-500 text-white p-1 mx-8 my-0 text-center rounded-md"
                    onClick={handleEditClick}
                >
                    ✏
                </li>
                <li
                    className="hidden group-hover/category:block cursor-pointer bg-red-600 text-white p-1 mx-8 my-0 text-center rounded-md"
                    onClick={handleDeleteClick}
                >
                    🗑
                </li>
                <li className={`${showMessage ? "" : "hidden"} col-span-3 font-semibold`}>{message}</li>
            </ul>
        </li>
    );
}
