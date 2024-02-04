import Image from "next/image";
import Link from "next/link";

export default function ProductForList({
    params,
}: {
    params: { title: string; description: string; price: string; image_url: string };
}) {
    const { title, description, price, image_url } = params;
    return (
        <Link href="/products/1" className="p-2 hover:bg-slate-700">
            <Image src={image_url} alt={title} width={200} height={200} className="w-48 h-48 m-2 object-contain" />
            <h4 className="font-bold text-xl">{title}</h4>
            <div className="max-h-10 relative overflow-hidden">
                <div className="absolute bg-gradient-to-b from-transparent to-slate-800 w-full h-full"></div>
                <p className="">{description}</p>
            </div>
            <span className="block w-full text-right pr-4 font-bold">${price}</span>
        </Link>
    );
}
