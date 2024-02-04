import ProductForList from "./ProductForList";

const products = [
    {
        title: "Business Card",
        image_url: "https://http2.mlstatic.com/D_NQ_NP_723685-MLU73579532244_122023-O.webp",
        description:
            "A funky little business card for little dirty folks like you A funky little business card for little dirty folks like you",
        price: "1500",
    },
    {
        title: "Guitar Business Card",
        image_url: "https://http2.mlstatic.com/D_NQ_NP_825434-MLA48751581707_012022-O.webp",
        description:
            "A funky little business card for little dirty folks like you A funky little business card for little dirty folks like you",
        price: "1500",
    },
    {
        title: "Business Guitar",
        image_url: "https://http2.mlstatic.com/D_NQ_NP_654832-MLA48208615610_112021-O.webp",
        description:
            "A funky little business card for little dirty folks like you A funky little business card for little dirty folks like you",
        price: "1500",
    },
    {
        title: "Guitar Card",
        image_url: "https://http2.mlstatic.com/D_NQ_NP_760935-MLA48760297705_012022-O.webp",
        description:
            "A funky little business card for little dirty folks like you A funky little business card for little dirty folks like you",
        price: "1500",
    },
];

export default function ProductList() {
    return (
        <div className="grid grid-cols-4 gap-2 p-2">
            {products.map((p) => (
                <ProductForList params={p} />
            ))}
        </div>
    );
}
