import Image from "next/image";
import Link from "next/link";

export default function ProductForList({
    params,
    activeUserId,
}: {
    params: {
        id: number;
        title: string;
        description: string;
        price: number;
        image_url: string;
        category_name: string;
        user_id: number;
    };
    activeUserId?: number;
}) {
    const { id, title, description, price, image_url, category_name, user_id } = params;
    return (
        <div className="p-2 hover:bg-slate-200 group/product rounded relative">
            {activeUserId && user_id === activeUserId ? (
                <span className="hidden group-hover/product:block absolute right-2 top-2">
                    <Link
                        href={`/products/edit/${id}`}
                        className="bg-orange-600 hover:bg-orange-500 text-white px-2 py-1 rounded"
                    >
                        Edit ✏
                    </Link>
                </span>
            ) : (
                ""
            )}
            <Link href={`/products/${id}`} className="">
                <Image
                    src={`${process.env["NEXT_PUBLIC_BACKEND_URL"]}storage/${image_url}`}
                    unoptimized={true}
                    alt={title}
                    width={200}
                    height={200}
                    className="w-48 h-48 p-2 object-contain"
                />
                <h4 className="font-bold text-xl overflow-x-clip whitespace-nowrap text-ellipsis">
                    {title}
                </h4>
                <div className="max-h-10 relative overflow-hidden">
                    <div className="absolute bg-gradient-to-b from-transparent to-slate-100 group-hover/product:to-slate-200 w-full h-full"></div>
                    <p className="">{description}</p>
                </div>
                <span className="block w-full text-right pr-4 font-bold">${price}</span>
                <p className="text-sm">Category: {category_name}</p>
            </Link>
        </div>
    );
}
