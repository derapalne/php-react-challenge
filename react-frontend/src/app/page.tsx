import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen w-9/12 bg-slate-800 mx-auto flex-col items-center">
            <div className="w-full bg-slate-900 text-center p-8">
                <h1 className="mb-4 text-4xl ">BSmart Product Shop</h1>
                <div>Listing All Products</div>
            </div>
            <div className="grid grid-cols-4 gap-2 p-2">
                <Link href="/products/1" className="p-2 hover:bg-slate-700">
                    <Image
                        src="https://http2.mlstatic.com/D_NQ_NP_723685-MLU73579532244_122023-O.webp"
                        alt="Guitar Business Card"
                        width={200}
                        height={200}
                        className="w-48 h-48 m-2"
                    />
                    <h4 className="font-bold text-xl">Business Card</h4>
                    <div className="max-h-10 relative overflow-hidden">
                        <div className="absolute bg-gradient-to-b from-transparent to-slate-800 w-full h-full"></div>
                        <p className="">
                            A funky little business card for little dirty folks like you A funky
                            little business card for little dirty folks like you
                        </p>
                    </div>
                    <span className="block w-full text-right pr-4 font-bold">$1500</span>
                </Link>
                <Link href="/products/1" className="p-2 hover:bg-slate-700">
                    <Image
                        src="https://http2.mlstatic.com/D_NQ_NP_825434-MLA48751581707_012022-O.webp"
                        alt="Guitar Business Card"
                        width={200}
                        height={200}
                        className="w-48 h-48 m-2"
                    />
                    <h4 className="font-bold text-xl">Business Guitar</h4>
                    <div className="max-h-10 relative overflow-hidden">
                        <div className="absolute bg-gradient-to-b from-transparent to-slate-800 w-full h-full"></div>
                        <p className="">
                            A funky little business card for little dirty folks like you A funky
                            little business card for little dirty folks like you
                        </p>
                    </div>
                    <span className="block w-full text-right pr-4 font-bold">$1500</span>
                </Link>
                <Link href="/products/1" className="p-2 hover:bg-slate-700">
                    <Image
                        src="https://http2.mlstatic.com/D_NQ_NP_654832-MLA48208615610_112021-O.webp"
                        alt="Guitar Business Card"
                        width={200}
                        height={200}
                        className="w-48 h-48 m-2"
                    />
                    <h4 className="font-bold text-xl">Business Card</h4>
                    <div className="max-h-10 relative overflow-hidden">
                        <div className="absolute bg-gradient-to-b from-transparent to-slate-800 w-full h-full"></div>
                        <p className="">
                            A funky little business card for little dirty folks like you A funky
                            little business card for little dirty folks like you
                        </p>
                    </div>
                    <span className="block w-full text-right pr-4 font-bold">$1500</span>
                </Link>
                <Link href="/products/1" className="p-2 hover:bg-slate-700">
                    <Image
                        src="https://http2.mlstatic.com/D_NQ_NP_760935-MLA48760297705_012022-O.webp"
                        alt="Guitar Business Card"
                        width={200}
                        height={200}
                        className="w-48 h-48 m-2"
                    />
                    <h4 className="font-bold text-xl">Business Card</h4>
                    <div className="max-h-10 relative overflow-hidden">
                        <div className="absolute bg-gradient-to-b from-transparent to-slate-800 w-full h-full"></div>
                        <p className="">
                            A funky little business card for little dirty folks like you A funky
                            little business card for little dirty folks like you
                        </p>
                    </div>
                    <span className="block w-full text-right pr-4 font-bold">$1500</span>
                </Link>
            </div>
        </main>
    );
}
