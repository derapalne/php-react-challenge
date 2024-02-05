import { Category as ICategory } from "@/interfaces/Category";

export default function Category({
    params,
}: {
    params: { category: ICategory; selectedCategory: string; onClickHandler: Function };
}) {
    return (
        <li
            className={`mx-2 px-1 ${
                params.selectedCategory === params.category.name ? "bg-slate-400" : "bg-slate-200"
            } rounded-md hover:bg-slate-300 cursor-pointer`}
            onClick={() => params.onClickHandler(params.category.name)}
        >
            {params.category.name}
        </li>
    );
}
