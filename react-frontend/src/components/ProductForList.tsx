import Image from "next/image";
import Link from "next/link";

export default function ProductForList({
    params,
}: {
    params: { title: string; description: string; price: string; image_url: string };
}) {
    const { title, description, price, image_url } = params;
    return (
        <Link href="/products/1" className="p-2 hover:bg-slate-300 rounded duration-100">
            <Image src={image_url} alt={title} width={200} height={200} className="w-48 h-48 p-2 object-contain" />
            <h4 className="font-bold text-xl overflow-x-clip whitespace-nowrap text-ellipsis">{title}</h4>
            <div className="max-h-10 relative overflow-hidden">
                <div className="absolute bg-gradient-to-b from-transparent to-slate-200 w-full h-full"></div>
                <p className="">{description}</p>
            </div>
            <span className="block w-full text-right pr-4 font-bold">${price}</span>
            <p className="text-sm">Provided by: Company Name</p>
        </Link>
    );
}
