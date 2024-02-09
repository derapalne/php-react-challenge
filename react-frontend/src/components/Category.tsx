import { Category as ICategory } from "@/interfaces/Category";

export default function Category({
    params,
}: {
    params: {
        category: ICategory;
        selectedCategory: string;
        onClickHandler?: Function;
        unlinked?: boolean;
    };
}) {
    function onClick() {
        if (params.onClickHandler) {
            params.onClickHandler(params.category.name);
        }
    }

    return (
        <li
            className={`m-2 mt-0 px-1 ${
                params.selectedCategory === params.category.name ? "bg-slate-400" : "bg-slate-200"
            } rounded-md ${params.unlinked ? "cursor-default" : "cursor-pointer"} hover:bg-slate-300 `}
            onClick={onClick}
        >
            {params.category.name}
        </li>
    );
}
