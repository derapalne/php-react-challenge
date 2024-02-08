"use client";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import Cookies from "js-cookie";
import { Bounce, ToastContainer, toast } from "react-toastify";

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

export default function CategoryAdder({
    handleAddNewCategory,
}: {
    handleAddNewCategory: Function;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        if (!accessToken) {
            const atCookie = Cookies.get("access_token");
            if (atCookie) setAccessToken(atCookie);
        }
    }, []);

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
            handleAddNewCategory(name);
            setIsOpen(false);
        }
    }

    function handleAddCategoryButtonClick() {
        setIsOpen(true);
    }

    function handleModalClosing() {
        setIsOpen(false);
    }

    return (
        <>
            <li
                className={`m-2 mt-0 px-1 bg-slate-200 rounded-md hover:bg-slate-300 cursor-pointer`}
                onClick={handleAddCategoryButtonClick}
            >
                + Add Category
            </li>
            <Modal isOpen={isOpen} onClose={handleModalClosing} hasCloseButton={true}>
                <div>
                    <div className="grid grid-cols-5 py-2">
                        <label className="col-span-1 m-auto" htmlFor="title">
                            Title:
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
